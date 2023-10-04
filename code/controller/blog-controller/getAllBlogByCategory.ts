import express from "express";
import { getBlogByCategory } from "../../api/blog-api/services/getBlogByCategory";

export const getAllBlogByCategory = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const category = req.query.category as string;
    if (!category) {
      return res
        .status(400)
        .send("Category is required to be entered to search blog.");
    }
    const findBlog = await getBlogByCategory(category);
    return res.json(findBlog);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
