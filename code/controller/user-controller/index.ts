import { register } from "./auth";
import { login } from "./login";
import { deleteUser } from "./deleteUser";
import { getAllUsers } from "./getAllUsers";
import { get_UserByEmail } from "./getUserByEmail";
import { get_UserById } from "./getUserById";
import { updateUser } from "./updateUser";
import { updateUserRoleToAdmin } from "./updateUserRoleToAdmin";
import { verifyUser } from "./verifyUser";
import { resetVerificationById } from "./resetVerificationById";

export {
  register,
  login,
  deleteUser,
  getAllUsers,
  get_UserByEmail,
  get_UserById,
  updateUser,
  updateUserRoleToAdmin,
  verifyUser,
  resetVerificationById,
};
