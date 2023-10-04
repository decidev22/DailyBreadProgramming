import express from "express";
import { getAllBlogs } from "../../api/blog-api/services/getAllBlogs";
import { top_N_Blogs } from "./utils/constants";

export const getPopularBlog = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const blogs = await getAllBlogs();
    // Select Top 5 blogs
    const popularBlogs = blogs.sort(
      (a, b) => a.viewCount - b.viewCount
    );
    // Saves top 5 blogs in lower view to highest view order.
    const topBlogs = popularBlogs.slice(-top_N_Blogs);
    return res.status(200).json(topBlogs);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
