import express from "express";
import { createBlog } from "../../api/blog-api/services";
import { getUserBySessionToken } from "../../api/user-api/getUserBySessionToken";
import { updateUserById } from "../../api/user-api/updateUserById";

export const createNewBlog = async (
  req: express.Request,
  res: express.Response
) => {
  const { title, content, category, hashTag } = req.body;

  if (!title || !content) {
    console.log("Need Title and Content to create a blog");
    return res.sendStatus(400);
  }
  try {
    // Check current user's session token
    const sessionToken = req.cookies[process.env.CRYPTO_SECRET];

    if (!sessionToken) {
      return res.sendStatus(403);
    }

    // Check existing user by session token
    const existingUser = await getUserBySessionToken(sessionToken);
    if (!existingUser) {
      return res.sendStatus(403);
    }

    const username = existingUser.username;
    const userId = existingUser.id;

    const now = new Date();
    const date = now.toISOString();
    const viewCount = 0;
    const recentAccess = [""];
    const lastEdited = now;

    // new blog properties
    const newBlog = await createBlog({
      title,
      content,
      username,
      userId,
      date,
      category,
      hashTag,
      viewCount,
      recentAccess,
      lastEdited,
    });

    // get author's' blog histroy
    const userBlogHistory = existingUser.blogHistory.blogids || [];

    userBlogHistory.push(`${newBlog._id}`);

    await updateUserById(existingUser.id, {
      blogHistory: { blogids: userBlogHistory },
    });

    // This function is commented out :: only addes in one blog log and overwrites.
    // await updateUserById(
    //   existingUser.id,
    //   merge(existingUser.blogHistory, {
    //     blogHistory: { blogids: `${newBlog._id}` },
    //   })
    // );

    return res.status(200).json(newBlog).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
