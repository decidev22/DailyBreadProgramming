import { BlogModel } from "../../../db/blogSchema";

export const getAllBlogs = () => BlogModel.find();
