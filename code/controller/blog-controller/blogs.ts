import express from "express";
import { merge } from "lodash";

import { createBlog } from "../../api/blog-api/services";
import { getUserBySessionToken } from "../../api/user-api/getUserBySessionToken";
import { getAllBlogs } from "../../api/blog-api/services/getAllBlogs";
import { deleteBlogById } from "../../api/blog-api/services/deleteBlogById";
import { getBlogByCategory } from "../../api/blog-api/services/getBlogByCategory";
import { getBlogByHashTag } from "../../api/blog-api/services/getBlogByHashTag";
import { getBlogById } from "../../api/blog-api/services/getBlogById";
import { updateUserById } from "../../api/user-api/updateUserById";

export const createNewBlog = async (
  req: express.Request,
  res: express.Response
) => {
  const { title, content, category, hashTag } = req.body;

  if (!title || !content) {
    console.log("Need Title and Content to create a blog");
    return res.sendStatus(400);
  }
  try {
    const sessionToken = req.cookies[process.env.CRYPTO_SECRET];

    if (!sessionToken) {
      return res.sendStatus(403);
    }

    const existingUser = await getUserBySessionToken(sessionToken);
    if (!existingUser) {
      return res.sendStatus(403);
    }

    const username = existingUser.username;
    const userId = existingUser.id;

    const now = new Date();
    const date = now.toISOString();

    const newBlog = await createBlog({
      title,
      content,
      username,
      userId,
      date,
      category,
      hashTag,
    });

    // get user blog histroy
    const userBlogHistory = existingUser.blogHistory.blogids || [];

    userBlogHistory.push(`${newBlog._id}`);

    await updateUserById(existingUser.id, {
      blogHistory: { blogids: userBlogHistory },
    });

    // This function is commented out :: only addes in one blog log and overwrites.
    // await updateUserById(
    //   existingUser.id,
    //   merge(existingUser.blogHistory, {
    //     blogHistory: { blogids: `${newBlog._id}` },
    //   })
    // );

    return res.status(200).json(newBlog).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const getBlog = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const blogs = await getAllBlogs();
    return res.status(200).json(blogs);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const get_BlogById = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const blogs = await getBlogById(id);
    return res.status(200).json(blogs);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const deleteBlog = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const deletedBlog = await deleteBlogById(id);
    return res.json(deletedBlog);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const getAllBlogByCategory = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const category = req.query.category as string;
    if (!category) {
      return res
        .status(400)
        .send("Category is required to be entered to search blog.");
    }
    const findBlog = await getBlogByCategory(category);
    return res.json(findBlog);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const updateBlog = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const input = req.body;
    console.log(input);
    const blog = await getBlogById(id);
    console.log(blog);
    if (!input) {
      console.log("No input");
      res.sendStatus(400);
    }

    merge(blog, input);

    await blog.save();

    return res.status(200).json(blog).end();
  } catch (error) {
    return res.sendStatus(400);
  }
};

export const getAllBlogByHashTag = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    // const { hashTag } = req.params;
    const hashTag = req.query.hashTag as string;
    // console.log("query HT", hashTag);
    if (!hashTag) {
      return res
        .status(400)
        .send("Hash tag is required to be entered to search blog.");
    }
    const findBlog = await getBlogByHashTag(hashTag);

    return res.status(200).json(findBlog);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};