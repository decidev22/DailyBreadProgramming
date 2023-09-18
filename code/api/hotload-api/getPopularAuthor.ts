import { HotloadModel } from "../../db/hotloadSchema";

export const getPopularAuthor = async () => {
  try {
    const popularAuthors = await HotloadModel.find({
      isPopular: {
        // checks if isPopular exists
        $exists: true,
        // negates a condition where the array has size 0
        $not: { $size: 0 },
      },
    });
    console.log(popularAuthors);
  } catch (error) {
    console.error(error);
  }
};
