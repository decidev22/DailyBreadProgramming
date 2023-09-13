import { UserModel } from "../../db/userSchema";

// Deletes user by id
export const deleteUserById = (id: string) =>
  UserModel.findOneAndDelete({ _id: id });
