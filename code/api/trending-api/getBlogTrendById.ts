import { TrendingModel } from "../../db/trendingSchema";

// This api will be used to call each blog items on the list.

export const getBlogTrendById = async (id: string) => {
  return await TrendingModel.find({ blogId: id });
};
