import Post from "../models/postModel.js";
import User from "../models/userModel.js";
import mongoose from "mongoose";

export const createPost = async (req, res) => {
  const newPost = new Post(req.body);
  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};
export const getPost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findById(id);
    return res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};
export const updatePost = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;
  try {
    const post = await Post.findById(id);
    if (post.userId === userId) {
      await post.updateOne({ $set: req.body });
      return res.status(201).send("Succesfully Updated the post");
    } else {
      return res.status(201).send("Access Forbidden");
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};
export const deletePost = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;
  try {
    const post = await Post.findById(id);
    if (post.userId === userId) {
      await post.deleteOne();
      return res.status(201).send("Post deleted Succesfully");
    } else {
      return res.status(201).send("Access Forbidden");
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};

export const likePost = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;
  try {
    const post = await Post.findById(id);
    if (!post.likes.includes(userId)) {
      await post.updateOne({ $push: { likes: userId } });
      res.status(201).send("Post Liked");
    } else {
      await post.updateOne({ $pull: { likes: userId } });
      res.status(201).send("Post Unliked");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTimelinePosts = async (req, res) => {
  const userId = req.params.id;

  try {
    const currentUserPosts = await Post.find({ userId: userId });
    const followingPosts = await User.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(userId),
        },
      },
      {
        $lookup: {
          from: "posts",
          localField: "following",
          foreignField: "userId",
          as: "followingPosts",
        },
      },
      {
        $project: {
          followingPosts: 1,
          _id: 0,
        },
      },
    ]);

    res.status(200).json(
      currentUserPosts
        .concat(...followingPosts[0].followingPosts)
        .sort((a, b) => {
          return b.createdAt - a.createdAt;
        })
    );
  } catch (error) {
    res.status(500).json(error);
  }
};
