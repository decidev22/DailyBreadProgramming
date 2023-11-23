import express from "express";
import { getUserBySessionToken } from "../../api/user-api/getUserBySessionToken";
import { addCommentToBlog } from "../../api/blog-api/services/addCommentToBlog";

// on frontend side- favorite button clicked, then run.
export const addNewCommentToBlog = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    // gets the blog id from current blog, assume it is passed as param
    const { id } = req.params;
    const { comment } = req.body;

    const sessionToken = req.cookies[process.env.CRYPTO_SECRET];

    if (!sessionToken) {
      return res.sendStatus(403);
    }

    const currentUser = await getUserBySessionToken(sessionToken);
    if (!currentUser) {
      return res.sendStatus(403);
    }

    const userData = {
      username: currentUser.username,
      userId: currentUser.id,
    };

    try {
      addCommentToBlog(id, userData, comment);
    } catch (error) {
      throw error;
    }

    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
