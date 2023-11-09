import express from "express";
import { getUsers } from "../../api/user-api/getAllUsers";

export const getAllUsers = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const users = await getUsers();

    // This section of the code was used to initialise viewBlogHistory
    // for (let i = 0; i < users.length; i++) {
    //   if (!users[i].verification.randomSeed) {
    //     users[i].verification.randomSeed = Math.floor(
    //       Math.random() * (999999 - 100000) + 1
    //     ).toString();
    //   }
    //   users[i].verification.verified = false;
    //   users[i].verification.failCount = 0;
    //   users[i].verification.timestamp = [];
    // }

    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
