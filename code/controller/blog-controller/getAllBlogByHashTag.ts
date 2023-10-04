import express from "express";
import { getBlogByHashTag } from "../../api/blog-api/services/getBlogByHashTag";

export const getAllBlogByHashTag = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const hashTag = req.query.hashTag as string;
    if (!hashTag) {
      return res
        .status(400)
        .send("Hash tag is required to be entered to search blog.");
    }
    const findBlog = await getBlogByHashTag(hashTag);

    return res.status(200).json(findBlog);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
