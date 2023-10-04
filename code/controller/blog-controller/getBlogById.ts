import express from "express";
import { getBlogById } from "../../api/blog-api/services/getBlogById";
import { isTrending } from "./utils/isTrending";

// This controller function will be used to load up the blog when clicked on individually from the list of blogs.
// Therefore it will also add +1 view to the blog.
export const get_BlogById = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const blogs = await getBlogById(id);

    // checks if there is a viewCount property, if not initialise it.
    if (blogs.viewCount) {
      blogs.viewCount += 1;
    } else {
      blogs.viewCount = 1;
    }

    // >> isTrending Part  - utils - helper for controller
    // add new time to recentAccess
    await isTrending(blogs, id);
    // >> isTrending Part done

    blogs.save();
    return res.status(200).json(blogs);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
