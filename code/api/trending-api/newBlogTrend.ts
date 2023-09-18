import { TrendingModel } from "../../db/trendingSchema";

export const newBlogTrend = async (values: Record<string, any>) => {
  try {
    const newTrend = await new TrendingModel(values).save();
    return newTrend.toObject();
  } catch (error) {
    console.error(
      "There was an error adding a new trending blog",
      error
    );
    throw error;
  }
};
