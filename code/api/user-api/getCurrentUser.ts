import express from "express";
import { getUserBySessionToken } from "./getUserBySessionToken";

const getCurrentUser = async (
  req: express.Request,
  res: express.Response
) => {
  // get current user
  const sessionToken = req.cookies[process.env.CRYPTO_SECRET];
  if (!sessionToken) {
    return res.sendStatus(403);
  }

  return await getUserBySessionToken(sessionToken);
};

export default getCurrentUser;
