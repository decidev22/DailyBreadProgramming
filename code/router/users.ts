import express from "express";
import {
  getAllUsers,
  deleteUser,
  updateUser,
  get_UserByEmail,
  updateUserRoleTo,
  get_UserById,
} from "../controller/user-controller/users";
import { isAdmin, isAuthenticated, isOwner } from "../middleware";

export default (router: express.Router) => {
  // endpoint , middleware, route handler function
  router.get("/users/:id", get_UserById);
  router.get("/users/email/:email", isAuthenticated, get_UserByEmail);
  router.get("/users", isAuthenticated, getAllUsers);
  router.delete("/users/:id", isAuthenticated, isOwner, deleteUser);
  router.put("/users/:id", isAuthenticated, isOwner, updateUser);
  router.put(
    "/users/role/:id",
    isAuthenticated,
    isAdmin,
    updateUserRoleTo
  );
};
