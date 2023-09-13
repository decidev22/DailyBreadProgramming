import express from "express";
import { getUserByEmail } from "../../api/user-api/getUserByEmail";
import { createUser } from "../../api/user-api/createUser";
import { random, authentication } from "../../helpers";

export const login = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.sendStatus(400);
    }

    const user = await getUserByEmail(email).select(
      "+authentication.salt +authentication.password"
    );

    if (!user) {
      return res.sendStatus(400);
    }

    const expectedHash = authentication(
      user.authentication.salt,
      password
    );
    if (user.authentication.password != expectedHash) {
      return res.sendStatus(403);
    }

    const salt = random();
    user.authentication.sessionToken = authentication(
      salt,
      user._id.toString()
    );

    await user.save();

    res.cookie(
      process.env.CRYPTO_SECRET,
      user.authentication.sessionToken,
      { domain: "localhost", path: "/" }
    );
    return res.status(200).json(user).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
