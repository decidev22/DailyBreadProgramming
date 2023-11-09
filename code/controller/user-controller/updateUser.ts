import express from "express";
import { updateUserById } from "../../api/user-api/updateUserById";
import { getUserById } from "../../api/user-api/getUserById";

export const updateUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const input = req.body;

    if (!input) {
      console.log("Error. Ther is no items provided to update user.");
      res.sendStatus(400);
    }

    let user = await getUserById(id);

    // Only these types can be chaned with Update
    type UserPropertyType =
      | "blogHistory"
      | "favoriteBlog"
      | "popularBlogsWritten"
      | "username"
      | "email"
      | "verification";

    const isUserProperty = (key: string): key is UserPropertyType => {
      return [
        "blogHistory",
        "favoriteBlog",
        "popularBlogsWritten",
        "username",
        "email",
        "verification",
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
