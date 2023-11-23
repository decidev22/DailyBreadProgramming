import { getUserBySessionToken } from "../../api/user-api/getUserBySessionToken";
import express from "express";

export const verifyUser = async (
  req: express.Request,
  res: express.Response
) => {
  // get current user
  const sessionToken = req.cookies[process.env.CRYPTO_SECRET];
  if (!sessionToken) {
    return res.sendStatus(403);
  }
  const existingUser = await getUserBySessionToken(sessionToken);
  const verificationCode = req.params.code as string;
  const now = new Date().toISOString();

  if (verificationCode == existingUser.verification.randomSeed) {
    console.log("Verification Successful");

    existingUser.verification.verified = true;
    // Successfully provided the code, hence, reset fail counter
    existingUser.verification.failCount = 0;
    // Reset the verification code
    existingUser.verification.randomSeed = Math.floor(
      Math.random() * (999999 - 100000) + 1
    ).toString();
    existingUser.verification.timestamp.push(
      "Successful Verification on: " + now
    );
    existingUser.save();

    return res.status(200).send("Verification Successful");
  } else {
    // if user gets code wrong 3 times, reset the fail count and recreate the code.
    if (existingUser.verification.failCount > 3) {
      existingUser.verification.randomSeed = Math.floor(
        Math.random() * (999999 - 100000) + 1
      ).toString();
      existingUser.verification.failCount = 0;
    } else {
      existingUser.verification.failCount += 1;
    }
    existingUser.verification.verified = false;
    existingUser.verification.timestamp.push(
      "Failed Verification attempt on: " + now
    );
    await existingUser.save();
    return res.status(400).send("Wrong verificaiton code entered.");
  }
};
