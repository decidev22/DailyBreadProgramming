import express from "express";

import { insertPopularAuthors } from "../controller/hot-load-controller/hotload";

export default (router: express.Router) => {
  router.post("/hotload/popularauth/:id", insertPopularAuthors);
  //   router.get("/hotload");
};
