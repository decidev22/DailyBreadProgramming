import mongoose from "mongoose";

const TrendingSchema = new mongoose.Schema({
  blogId: String,
  time: Date,
  repeat: Number,
  title: String,
  content: String,
});

export const TrendingModel = mongoose.model(
  "Trending",
  TrendingSchema
);
