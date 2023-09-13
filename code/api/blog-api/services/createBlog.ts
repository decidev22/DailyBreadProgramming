import { BlogModel } from "../../../db/blogSchema";

export const createBlog = async (values: Record<string, any>) => {
  try {
    const newBlog = await new BlogModel(values).save();
    return newBlog.toObject();
  } catch (error) {
    console.error("There was an error creating a new blog", error);
    throw error;
  }
};
