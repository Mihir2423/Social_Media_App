import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    userId: { type: String, required: true },
    desc: String,
    likes: [],
    image: String,
    name: String,
    userProfilePic :String
  },
  { timestamps: true }
);

export default mongoose.model("Posts", postSchema);
