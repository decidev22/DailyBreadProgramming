import { UserModel } from "../../db/userSchema";

export const createUser = async (values: Record<string, any>) => {
  try {
    const newUser = await new UserModel(values).save();
    return newUser.toObject;
  } catch (error) {
    console.error("There is an error creating this user: ", error);
    throw error;
  }
};
