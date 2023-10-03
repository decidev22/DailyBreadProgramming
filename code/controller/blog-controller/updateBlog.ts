import express from "express";
import { merge } from "lodash";
import { getBlogById } from "../../api/blog-api/services/getBlogById";

export const updateBlog = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const input = req.body;
    console.log(input);
    const blog = await getBlogById(id);
    console.log(blog);
    if (!input) {
      console.log("No input");
      res.sendStatus(400);
    }

    merge(blog, input);
    await blog.save();

    return res.status(200).json(blog).end();
  } catch (error) {
    return res.sendStatus(400);
  }
};
