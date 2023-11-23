import { TrendingModel } from "../../db/trendingSchema";

// This api will be used to call each blog items on the list.

export const getAllTrendingBlog = async () => {
  return await TrendingModel.find();
};
