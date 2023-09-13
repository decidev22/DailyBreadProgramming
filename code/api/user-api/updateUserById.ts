import { UserModel } from "../../db/userSchema";

export const updateUserById = (
  id: string,
  values: Record<string, any>
) => UserModel.findByIdAndUpdate(id, values);
