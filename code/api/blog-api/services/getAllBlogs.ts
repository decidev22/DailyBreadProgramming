import { BlogModel } from "../../../db/blogSchema";

type SortType = "ASC" | "DESC";

export const getAllBlogs = async (sortType: SortType) => {
  const sortBy = sortType === "ASC" ? 1 : -1;
  try {
    const blogs = await BlogModel.find().sort({ date: sortBy });
    return blogs;
  } catch (error) {
    throw new Error("Error fetching blogs: " + error);
  }
};
