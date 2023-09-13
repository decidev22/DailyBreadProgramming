import { UserModel } from "../../db/userSchema";

export const getUsers = () => UserModel.find();
