import express from "express";
import routeAuth from "./routeAuth";
import users from "./users";
import blogs from "./blogs";

const router = express.Router();

export default (): express.Router => {
  routeAuth(router);
  users(router);
  blogs(router);
  return router;
};
