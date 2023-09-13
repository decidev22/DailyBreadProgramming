import { BlogModel } from "../../../db/blogSchema";

// This api will be used to call each blog items on the list.

export const getBlogById = (id: string) =>
  BlogModel.findById({ _id: id });
