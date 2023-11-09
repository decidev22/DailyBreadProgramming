import express from "express";
import { getUserBySessionToken } from "../../api/user-api/getUserBySessionToken";

export const resetVerificationById = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const sessionToken = req.cookies[process.env.CRYPTO_SECRET];
    if (!sessionToken) {
      return res.sendStatus(403);
    }
    const user = await getUserBySessionToken(sessionToken);

    user.verification.randomSeed = Math.floor(
      Math.random() * (999999 - 100000) + 1
    ).toString();

    const now = new Date().toISOString();
    user.verification.timestamp.push(`Code reset on: ${now}`);

    user.save();

    return res
      .status(200)
      .send("Verification Code Reset Successful.");
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
