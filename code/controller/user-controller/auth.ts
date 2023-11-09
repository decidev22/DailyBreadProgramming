// This is a controller auth code.

import express from "express";
import { getUserByEmail } from "../../api/user-api/getUserByEmail";
import { createUser } from "../../api/user-api/createUser";
import { random, authentication } from "../../helpers";
import { verifyUserEmail } from "../../api/user-api/sendUserEmailVerification";
import { createNewVerification } from "../../api/user-api/createNewVerification";

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

    // check if email is in the right format
    const pattern_typeEmail =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email.match(pattern_typeEmail)) {
      console.log("Invalid Email Format");
      return res.sendStatus(400);
    }

    // check if there is an existing user by the email input
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      console.log("Existing User");
      console.log(existingUser);
      return res.sendStatus(400);
    }

    // this random seed will later be sent to user by email and compared by user input on dashboard and only valid for 5 minutes.
    const random_seed = createNewVerification(existingUser);
    console.log(random_seed);

    // salt random and random seed is separated.
    const salt = random();
    const role = "member";
    const newUser = await createUser({
      email,
      verification: {
        randomSeed: random_seed,
        verified: false,
        failCount: 0,
      },
      username,
      authentication: {
        salt,
        password: authentication(salt, password),
      },
      role,
    });

    verifyUserEmail(email);
    return res.status(200).json(newUser).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
