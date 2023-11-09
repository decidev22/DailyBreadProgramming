import express from "express";
import { getAllBlogs } from "../../api/blog-api/services/getAllBlogs";

// This function will be used to show the list of blogs.
// To-Do: make it return in DESC order in time so it shows most recent ones first.
export const getBlog = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const blogs = await getAllBlogs("DESC");

    return res.status(200).json(blogs);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
