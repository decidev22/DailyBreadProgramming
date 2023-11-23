import { UserModel } from "../../db/userSchema";

// This api will enable to pass on any search variables in theory to find by name, email and more...
// What is a potential flaw by doing this?
// Any better way to hnadle?

export const getUserByUsername = (username: string) => {
  let user;
  try {
    user = UserModel.findOne({ username });
    return user;
  } catch (error) {
    console.log("No user found with provided username");
    return null;
  }
};
