// Can this be processed on FE instead?
// What's best practice?
import { BlogModel } from "../../../db/blogSchema";

// Categories separated by %2C which is ',' in string
export const getBlogByCategory = async (category: string) => {
  const categories = category.split(",");
  return await BlogModel.find({ category: { $all: categories } });
};
