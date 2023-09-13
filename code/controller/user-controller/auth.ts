// This is a controller auth code.

import express from "express";
import { getUserByEmail } from "../../api/user-api/getUserByEmail";
import { createUser } from "../../api/user-api/createUser";
import { random, authentication } from "../../helpers";

export const register = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { email, password, username } = req.body;

    if (!email || !password || !username) {
      console.log("email, password, username NOT passwed correctly");
      return res.sendStatus(400);
    }
    console.log("email, password, username passwed correctly");

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      console.log("Existing User");
      console.log(existingUser);
      return res.sendStatus(400);
    }

    const salt = random();
    const role = "member";
    const newUser = await createUser({
      email,
      username,
      authentication: {
        salt,
        password: authentication(salt, password),
      },
      role,
    });
    console.log("new user created");
    console.log(newUser);
    return res.status(200).json(newUser).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
