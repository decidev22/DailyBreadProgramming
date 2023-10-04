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

    // check if input body has all the necessary arguments
    if (!email || !password || !username) {
      console.log(
        "Error. One or more of email, password, username is/are NOT passed correctly."
      );
      return res.sendStatus(400);
    }

    // check if there is an existing user by the email input
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
    return res.status(200).json(newUser).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
