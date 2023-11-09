import express from "express";
import { getUserBySessionToken } from "./getUserBySessionToken";

export const getCurrentUserId = async (
  req: express.Request,
  res: express.Response
) => {
  // get current user
  const sessionToken = req.cookies[process.env.CRYPTO_SECRET];
  if (!sessionToken) {
    return res.sendStatus(403);
  }
  const user = await getUserBySessionToken(sessionToken);
  const userId = user.id;
  return userId;
};
