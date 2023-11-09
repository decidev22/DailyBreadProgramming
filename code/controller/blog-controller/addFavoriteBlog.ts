import express from "express";
import { getUserBySessionToken } from "../../api/user-api/getUserBySessionToken";

// on frontend side- favorite button clicked, then run.
export const addFavoriteBlog = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    // gets the blog id from current blog, assume it is passed as param
    const { id } = req.params;

    const sessionToken = req.cookies[process.env.CRYPTO_SECRET];

    if (!sessionToken) {
      return res.sendStatus(403);
    }

    const currentUser = await getUserBySessionToken(sessionToken);
    if (!currentUser) {
      return res.sendStatus(403);
    }

    if (!currentUser.favoriteBlog.blogids.includes(id)) {
      currentUser.favoriteBlog.blogids.push(id);
    }
    currentUser.save();

    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
