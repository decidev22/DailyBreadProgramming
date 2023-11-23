import { getAllTrendingBlog } from "../../api/trending-api/getAllTrendingBlog";
import { trending_N_Blogs } from "./utils/constants";
import express from "express";

export const get_AllTrendingBlog = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const trending = await getAllTrendingBlog();
    let trending_display_count = 0;
    if (trending) {
      // reverse() will show trending blogs by latest time order
      const reversed_trend = trending.reverse();
      if (trending_N_Blogs > trending.length) {
        trending_display_count = trending.length;
      } else {
        trending_display_count = trending_N_Blogs;
      }
      // console.log("Currently displaying: ",trending_display_count, " items on Trending Blogs");
      return res
        .status(200)
        .send(reversed_trend.slice(0, trending_N_Blogs));
    } else {
      return res.status(400).send("No Trending Blogs Found");
    }
  } catch (error) {
    res.sendStatus(400);
  }
};
