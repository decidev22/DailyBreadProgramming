import { UserModel } from "../../db/userSchema";
import { getUserById } from "./getUserById";

export const getBlogsByUserId = async (id: string) => {
  // check if user exists
  if (getUserById(id)) {
    const user = await getUserById(id);
    if (user && user.blogHistory) {
      return user.blogHistory;
    }
  } else {
    return ["Opps... This user does not exist"];
  }
};
