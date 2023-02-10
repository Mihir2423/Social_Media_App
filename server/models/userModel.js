import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    id: { type: String },
    isAdmin: { type: Boolean, default: false },
    profilePic: String,
    coverPic: String,
    livesIn: String,
    followers: [] ,
    following: [],
    worksAt: String,
    relationship: String,
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
