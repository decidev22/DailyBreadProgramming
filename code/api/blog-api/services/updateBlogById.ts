import { BlogModel } from "../../../db/blogSchema";

export const updateBlogById = (
  id: string,
  values: Record<string, any>
) => BlogModel.findByIdAndUpdate(id, values);
