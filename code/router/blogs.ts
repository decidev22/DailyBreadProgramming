import express from "express";

import {
  createNewBlog,
  deleteBlog,
  getBlog,
  getAllBlogByCategory,
  updateBlog,
  getAllBlogByHashTag,
  get_BlogById,
  getPopularBlog,
  addFavoriteBlog,
} from "../controller/blog-controller/blogs";
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
  router.post("/blogs/favorite/:id", addFavoriteBlog);
  router.get("/blogs", getBlog);
  //Interesting find, the :id will be called and will cause an error if hashtag route is below getBlogById.
  router.get("/blogs/hashtag", getAllBlogByHashTag);
  router.get("/blogs/category", getAllBlogByCategory);
  router.get("/blogs/popular", getPopularBlog);
  router.get("/blogs/:id", isAuthenticated, get_BlogById);

  //query instead of path params
  //OR, to get all with at least one of the ....

  //is owner currently doesn't relate well to userinfo below.
  router.delete(
    "/blogs/:id",
    isAuthenticated,
    isBlogOwner,
    deleteBlog
  );
  router.put("/blogs/:id", isAuthenticated, isBlogOwner, updateBlog);
};
