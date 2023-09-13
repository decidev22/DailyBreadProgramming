import { BlogModel } from "../../../db/blogSchema";

export const getBlogByHashTag = async (hashTag: string) => {
  const tags = hashTag.split(",");
  console.log(tags);

  // OR operator for Mongoose -> $in
  // AND operator -> $all
  return await BlogModel.find({ hashTag: { $all: tags } });
};
