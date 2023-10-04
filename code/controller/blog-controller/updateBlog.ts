import express from "express";
import { merge } from "lodash";
import { getBlogById } from "../../api/blog-api/services/getBlogById";
import { updateBlogById } from "../../api/blog-api/services/updateBlogById";

export const updateBlog = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const input = req.body;
    if (!input) {
      console.log("Error. Ther is no items provided to update blog.");
      res.sendStatus(400);
    }

    const blog = await getBlogById(id);

    // editable blog type
    type BlogPropertyType =
      | "title"
      | "content"
      | "hashTag"
      | "category";

    const isBlogProperty = (key: string): key is BlogPropertyType => {
      return ["title", "content", "hashTag", "category"].includes(
        key
      );
    };

    for (let property in input) {
      if (isBlogProperty(property)) {
        blog[property] = input[property];
      }
    }

    const now = new Date();
    blog.lastEdited = now;

    await updateBlogById(id, blog);
    await blog.save();

    return res.status(200).json(blog).end();
  } catch (error) {
    return res.sendStatus(400);
  }
};
