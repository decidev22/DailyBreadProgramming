import { HotloadModel } from "../../db/hotloadSchema";

export const updatePopularAuthor = async (
  values: Record<string, any>
) => {
  try {
    const id = "65081383b1ebf1fef3519c57";
    HotloadModel.findByIdAndUpdate(id, values);
  } catch (error) {
    console.error("There was an error creating a new blog", error);
    throw error;
  }
};
