import express from "express";

import { getUsers } from "../../api/user-api/getAllUsers";
import { deleteUserById } from "../../api/user-api/deleteUserById";
import { getUserById } from "../../api/user-api/getUserById";
import { getUserByEmail } from "../../api/user-api/getUserByEmail";
import { updateUserById } from "../../api/user-api/updateUserById";
import {
  Role,
  updateUserRole,
} from "../../api/user-api/updateUserRole";
import { merge, mergeWith } from "lodash";

export const getAllUsers = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const users = await getUsers();

    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const get_UserByEmail = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { email } = req.params;
    const user = await getUserByEmail(email);
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const get_UserById = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const user = await getUserById(id);
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const deleteUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const deletedUser = await deleteUserById(id);
    return res.json(deletedUser);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const updateUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const input = req.body;

    let user = await getUserById(id);

    type UserPropertyType =
      | "blogHistory"
      | "favoriteBlog"
      | "popularBlogsWritten"
      | "_id"
      | "username"
      | "email";

    const isUserProperty = (key: string): key is UserPropertyType => {
      return [
        "blogHistory",
        "favoriteBlog",
        "popularBlogsWritten",
        "_id",
        "username",
        "email",
      ].includes(key);
    };

    for (let property in input) {
      if (isUserProperty(property)) {
        // Now TypeScript knows that `property` is of type `UserPropertyType`,
        // bracket notation can safely access the user's property by doing this.
        // not by doing user.property <- this, typescript will not understand.
        user[property] = input[property];
      }
    }

    // Update user in the database
    await updateUserById(id, user);
    user.save();

    return res.status(200).json(user).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const updateUserRoleTo = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const input = req.body;

    // verify if user exists
    const user = await getUserById(id);
    if (!input.username) {
      user.username = user.username;
    } else {
      user.username = input.username;
    }
    // check if the role name is being passed
    const role: Role = input.role;
    if (role) {
      await updateUserRole(id, { role });
    } else {
      console.log("Failed to update user role");
    }
    // need to save user to update.
    user.save();
    return res.status(200).json(user).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
