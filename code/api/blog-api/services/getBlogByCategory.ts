// Can this be processed on FE instead?
// What's best practice?
import { BlogModel } from "../../../db/blogSchema";

// This api will enable to pass on any search variables in theory to find by name, email and more...
// What is a potential flaw by doing this?
// Any better way to hnadle?

export const getBlogByCategory = async (category: string) => {
  const categories = decodeURIComponent(category).split(",");
  return await BlogModel.find({ category: { $all: categories } });
};
