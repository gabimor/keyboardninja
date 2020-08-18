import mongoose, { Schema } from "mongoose";

export const User = mongoose.model(
  "users",
  new Schema({
    email: String,
    password: String,
  })
);
