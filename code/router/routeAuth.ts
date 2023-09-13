import express from "express";
import { register } from "../controller/user-controller/auth";
import { login } from "../controller/user-controller/login";
export default (router: express.Router) => {
  router.post("/auth/register", register);
  router.post("/auth/login", login);
};
