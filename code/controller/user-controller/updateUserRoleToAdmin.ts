import express from "express";
import {
  Role,
  updateUserRole,
} from "../../api/user-api/updateUserRole";
import { getUserById } from "../../api/user-api/getUserById";

export const updateUserRoleToAdmin = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    // const input = req.body;

    // verify if user exists
    const user = await getUserById(id);
    // if (!input.username) {
    //   user.username = user.username;
    // } else {
    //   user.username = input.username;
    // }
    // check if the role name is being passed
    await updateUserRole(id, { Role: "Admin" });

    // need to save user to update.
    user.save();
    return res.status(200).json(user).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
