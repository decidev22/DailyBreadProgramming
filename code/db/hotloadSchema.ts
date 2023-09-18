import mongoose from "mongoose";

const HotloadSchema = new mongoose.Schema({
  isTrending: {
    type: [String],
  },
  isPopular: {
    type: [String],
  },
  popularAuthor: [
    {
      name: { type: String },
      blogName: { type: String },
      authorid: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    },
  ],
});

export const HotloadModel = mongoose.model("HotLoad", HotloadSchema);
