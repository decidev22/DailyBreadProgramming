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
    const blog = await getBlogById(id);

    // checks if there is a viewCount property, if not initialise it.
    // only increment viewCount if the viewer is not thee author
    const authorId = blog.userId;
    const sessionToken = req.cookies[process.env.CRYPTO_SECRET];
    if (!sessionToken) {
      return res.sendStatus(403);
    }
    const currentUser = await getUserBySessionToken(sessionToken);
    if (!currentUser) {
      return res.sendStatus(403);
    }
    if (blog.viewCount && currentUser.id != authorId) {
      blog.viewCount += 1;

      // isTrending adds recent access record and adds trending blog to the trending table.
      // This will also only run when the viewer is not the author.
      await isTrending(blog, id);
    } else {
      blog.viewCount = 1;
    }

    //Add the blogid to user's viewedBlogHistory.blogid
    currentUser.viewedBlogHistory.blogids += blog.id;
    currentUser.save();

    blog.save();
    return res.status(200).json(blog);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
