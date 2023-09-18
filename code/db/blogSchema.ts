import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema({
  bid: {
    type: String,
  },
  username: {
    type: String,
  },
  userId: {
    type: String,
  },
  title: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
  },
  content: {
    type: String,
    required: true,
  },
  hashTag: {
    type: [String],
  },
  category: {
    type: [String],
  },
  viewCount: {
    type: Number,
  },
  recentAccess: {
    type: [String],
  },
  lastTrendingTime: {
    type: Date,
  },
});

export const BlogModel = mongoose.model("Blog", BlogSchema);
