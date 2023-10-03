import { UserModel } from "../../db/userSchema";

// This api will enable to pass on any search variables in theory to find by name, email and more...
// What is a potential flaw by doing this?
// Any better way to hnadle?

export const getUserById = (id: string) =>
  UserModel.findOne({ _id: id });
