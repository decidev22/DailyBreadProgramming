import express from "express";
import {
  createNewBlog,
  addFavoriteBlog,
  deleteBlog,
  getBlog,
  getAllBlogByCategory,
  getAllBlogByHashTag,
  get_BlogById,
  getPopularBlog,
  updateBlog,
  getAllBlogsByUserId,
  get_AllTrendingBlog,
  addNewCommentToBlog,
} from "../controller/blog-controller/index";

import {
  isAuthenticated,
  isBlogOwner,
  isNotSpam,
} from "../middleware";

export default (router: express.Router) => {
  router.post(
    "/blogs/newBlog",
    isAuthenticated,
    isNotSpam,
    createNewBlog
  );

  router.post("/blogs/:id/comment", addNewCommentToBlog);
  router.post("/blogs/favorite/:id", addFavoriteBlog);
  router.get("/blogs/userid/:id", getAllBlogsByUserId);
  router.get("/blogs", getBlog);
  //Interesting find, the :id will be called and will cause an error if hashtag route is below getBlogById.
  router.get("/blogs/hashtag", getAllBlogByHashTag);
  router.get("/blogs/category", getAllBlogByCategory);
  router.get("/blogs/popular", getPopularBlog);
  router.get("/blogs/trending", get_AllTrendingBlog);
  router.get("/blogs/:id", isAuthenticated, get_BlogById);
  router.delete(
    "/blogs/:id",
    isAuthenticated,
    isBlogOwner,
    deleteBlog
  );
  router.put("/blogs/:id", isAuthenticated, isBlogOwner, updateBlog);
};
