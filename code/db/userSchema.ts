import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  uid: {
    type: Number,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  verification: {
    randomSeed: String,
    verified: Boolean,
    failCount: Number,
  },
  authentication: {
    password: { type: String, required: true, select: false },
    salt: { type: String, select: false },
    sessionToken: { type: String, select: false },
  },
  profileTitle: {
    type: String,
  },
  blogHistory: {
    blogids: [String],
  },
  viewedBlogHistory: {
    blogids: [String],
  },
  role: {
    type: String,
  },
  favoriteBlog: {
    blogids: [String],
  },
  popularBlogsWritten: {
    blogids: [String],
  },
});

export const UserModel = mongoose.model("User", UserSchema);
