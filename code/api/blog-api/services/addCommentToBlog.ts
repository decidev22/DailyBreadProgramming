import { getBlogById } from "./getBlogById";
import { getUserById } from "../../user-api/getUserById";

type User = {
  username: string;
  userId: string;
};

export const addCommentToBlog = async (
  blogId: string,
  currentUser: User,
  comment: string
) => {
  try {
    const blog = await getBlogById(blogId);
    const userName = currentUser.username;
    const userId = currentUser.userId;
    const user = await getUserById(userId);

    const now = new Date();

    blog.comments.push({
      username: userName,
      message: comment,
      timestamp: now,
      lastEdited: now,
    });
    blog.save();
    user.myComments.records.push({
      blogId: blogId,
      comment: comment,
      time: now,
    });
    user.save();

    console.log(blog.comments);
  } catch (error) {
    console.log(error);
    throw error;
  }
};
