import express from "express";
import { getBlogById } from "../../api/blog-api/services/getBlogById";
import { isTrending } from "./utils/isTrending";
import { getUserBySessionToken } from "../../api/user-api/getUserBySessionToken";

// This controller function will be used to load up the blog when clicked on individually from the list of blogs.
// Therefore it will also add +1 view to the blog and check if the blog is trending
export const get_BlogById = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const blogs = await getBlogById(id);

    // checks if there is a viewCount property, if not initialise it.
    // only increment viewCount if the viewer is not thee author
    const authorId = blogs.userId;
    const sessionToken = req.cookies[process.env.CRYPTO_SECRET];
    if (!sessionToken) {
      return res.sendStatus(403);
    }
    const currentUser = await getUserBySessionToken(sessionToken);
    if (!currentUser) {
      return res.sendStatus(403);
    }
    if (blogs.viewCount && currentUser.id != authorId) {
      blogs.viewCount += 1;

      // isTrending adds recent access record and adds trending blog to the trending table.
      // This will also only run when the viewer is not the author.
      await isTrending(blogs, id);
    } else {
      blogs.viewCount = 1;
    }

    blogs.save();
    return res.status(200).json(blogs);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
