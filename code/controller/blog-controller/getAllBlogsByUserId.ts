import { getBlogsByUserId } from "../../api/blog-api/services/getBlogsByUserId";
import { getCurrentUserId } from "../../api/user-api/getCurrentUserId";
import express from "express";

export const getAllBlogsByUserId = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const userid = await getCurrentUserId(req, res);
    return res.status(200).send(await getBlogsByUserId(userid));
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
