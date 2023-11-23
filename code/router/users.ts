import express from "express";
import {
  getAllUsers,
  deleteUser,
  updateUser,
  get_UserByEmail,
  updateUserRoleToAdmin,
  get_UserById,
  resetVerificationById,
  verifyUser,
} from "../controller/user-controller/index";
import { isAdmin, isAuthenticated, isOwner } from "../middleware";

export default (router: express.Router) => {
  // endpoint , middleware, route handler function
  router.get("/users/:id", get_UserById);
  router.get("/users/email/:email", isAuthenticated, get_UserByEmail);
  router.get("/users", isAuthenticated, getAllUsers);
  router.delete("/users/:id", isAuthenticated, isOwner, deleteUser);
  router.put("/users/:id", isAuthenticated, isOwner, updateUser);
  router.put(
    "/users/:id/verification/reset",
    isAuthenticated,
    isOwner,
    resetVerificationById
  );
  router.put(
    "/users/role/admin/:id",
    isAuthenticated,
    isAdmin,
    updateUserRoleToAdmin
  );
  router.patch(
    "/users/:id/verify/:code",
    isAuthenticated,
    isOwner,
    verifyUser
  );
};
