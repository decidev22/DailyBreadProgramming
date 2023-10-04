import express from "express";
import { deleteBlogById } from "../../api/blog-api/services/deleteBlogById";
import { getUserBySessionToken } from "../../api/user-api/getUserBySessionToken";

export const deleteBlog = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const deletedBlog = await deleteBlogById(id);

    // Also remove it from user's blog record
    const sessionToken = req.cookies[process.env.CRYPTO_SECRET];
    if (!sessionToken) {
      return res.sendStatus(403);
    }

    const currentUser = await getUserBySessionToken(sessionToken);
    if (!currentUser) {
      return res.sendStatus(403);
    }

    const blogidToDelete = id;
    const indexOfblogId =
      currentUser.blogHistory.blogids.indexOf(blogidToDelete);
    if (indexOfblogId !== -1) {
      // we are using splice here, because simply removing it will leave the deleted element 'undefined'
      //The splice method can add and/or remove elements from an array.
      // If the index is valid (i.e., not -1), splice will remove the element at that index, effectively reducing the length of the array by one.
      currentUser.blogHistory.blogids.splice(indexOfblogId, 1);
    }

    // save the user
    currentUser.save();
    return res.json(deletedBlog);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
