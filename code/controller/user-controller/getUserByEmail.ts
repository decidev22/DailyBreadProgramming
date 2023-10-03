import express from "express";
import { getUserByEmail } from "../../api/user-api/getUserByEmail";

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
