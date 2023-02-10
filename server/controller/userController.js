import User from "../models/userModel.js";
import bcrypt from "bcryptjs";

export const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (user) {
      const { password, ...other } = user._doc;
      res.status(201).json(other);
    } else {
      res.status(404).json({ message: "User doesn't exist" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong." });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { currentUserId, currentUserAdminStatus, password } = req.body;
  if (id === currentUserId || currentUserAdminStatus) {
    try {
      if (password) {
        req.body.password = await bcrypt.hash(password, 12);
      }
      const user = await User.findByIdAndUpdate(id, req.body, { new: true });
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: "Something went wrong." });
    }
  } else {
    res.status(404).send("Access Denied!");
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  const { currentUserId, currenUserAdminStatus } = req.body;
  if (id === currentUserId || currenUserAdminStatus) {
    try {
      await User.findByIdAndDelete(id);
      return res.status(201).send("User Deleted");
    } catch (error) {
      res.status(500).json({ message: "Something went wrong." });
    }
  } else {
    res.status(404).send("Access Denied!");
  }
};

export const followUser = async (req, res) => {
  const { id } = req.params;
  const { currentUserId } = req.body;
  if (id === currentUserId) {
    res.status(404).send("Action Denied");
  } else {
    try {
      const followUser = await User.findById(id);
      const followingUser = await User.findById(currentUserId);
      if (!followUser.followers.includes(currentUserId)) {
        await followUser.updateOne({ $push: { followers: currentUserId } });
        await followingUser.updateOne({ $push: { following: id } });
        res.status(201).send("User Followed Successfully!");
      } else {
        res.status(400).send("User is already followed by you.");
      }
    } catch (error) {
      res.status(404).send(error.message);
    }
  }
};

export const unFollowUser = async (req, res) => {
  const { id } = req.params;
  const { currentUserId } = req.body;
  if (id === currentUserId) {
    res.status(404).send("Action Denied");
  } else {
    try {
      const UnfollowUser = await User.findById(id);
      const UnfollowingUser = await User.findById(currentUserId);
      if (UnfollowUser.followers.includes(currentUserId)) {
        await UnfollowUser.updateOne({ $pull: { followers: currentUserId } });
        await UnfollowingUser.updateOne({ $pull: { following: id } });
        res.status(201).send("User Unfollowed!");
      } else {
        res.status(400).send("User is already Unfollowed by you.");
      }
    } catch (error) {
      res.status(404).send(error.message);
    }
  }
};

export const getAllUser = async (req,res) =>{
  try {
    let allUser = await User.find();
    allUser = allUser.map((user)=> {
      const { password, ...other } = user._doc;
      return other
    })
    res.status(200).json(allUser);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}