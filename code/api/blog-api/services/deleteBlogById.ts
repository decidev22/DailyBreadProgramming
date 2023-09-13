import { BlogModel } from "../../../db/blogSchema";
// Deletes user by id
export const deleteBlogById = (id: string) =>
  BlogModel.findOneAndDelete({ _id: id });
