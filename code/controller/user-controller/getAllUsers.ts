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
    //   if (!users[i].viewedBlogHistory) {
    //     users[i].viewedBlogHistory.blogids = [];
    //   }
    // }

    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
