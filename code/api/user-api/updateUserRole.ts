import { UserModel } from "../../db/userSchema";

export type Role = "Member" | "Premium" | "Admin";

export const updateUserRole = (
  id: string,
  values: Record<string, Role>
) => UserModel.findByIdAndUpdate(id, values);
