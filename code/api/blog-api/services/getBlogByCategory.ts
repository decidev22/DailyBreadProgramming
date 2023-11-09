import { BlogModel } from "../../../db/blogSchema";

// This api will enable to pass on any search variables in theory to find by name, email and more...
// Thus when ran in controller there will be limits to the type of properties it can update.
export const getBlogByCategory = async (category: string) => {
  const categories = decodeURIComponent(category).split(",");
  return await BlogModel.find({ category: { $all: categories } });
};
