import mongoose from "mongoose";

const TrendingSchema = new mongoose.Schema({
  blogId: String,
  time: Date,
  repeat: Number,
});

export const TrendingModel = mongoose.model(
  "Trending",
  TrendingSchema
);
