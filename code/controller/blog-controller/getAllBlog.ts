import express from "express";
import { getAllBlogs } from "../../api/blog-api/services/getAllBlogs";

// This function will be used to show the list of blogs.
// To-Do: make it return in DESC order in time so it shows most recent ones first.
export const getBlog = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const blogs = await getAllBlogs();

    // This block was used to initialise viewCount property on blogs created before viewCount
    for (let i = 0; i < blogs.length; i++) {
      if (!blogs[i].viewCount) {
        blogs[i].viewCount = 0;
        blogs[i].save();
      }

      // This block was used to initialise recentAccess
      if (!blogs[i].recentAccess) {
        blogs[i].recentAccess = [""];
      }

      // gives the lastTrendingTime value of 1970-01-01 and this only refers that there has not been a trending in this blog.
      // if (!blogs[i].lastTrendingTime) {
      //   blogs[i].lastTrendingTime = new Date(0);
      // }
    }

    return res.status(200).json(blogs);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
