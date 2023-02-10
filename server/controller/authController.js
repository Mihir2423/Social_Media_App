import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/userModel.js";

const secret = "test";

export const signIn = async (req, res) => {
  const { email, password } = req.body;

  try {

    const oldUser = await User.findOne({email})
    if (!oldUser) return res.status(400).send("User doesn't exist.")

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password)

    if(!isPasswordCorrect) return res.status(400).send("Invalid credentials")

    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
        expiresIn: "10h",
      });

      return res.status(201).json({ oldUser, token });

  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });

    console.log(error);
  }
};

export const signUp = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  try {
    const oldUser = await User.findOne({ email });

    if (oldUser) return res.status(400).send("User already exist.");

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await User.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
    });

    const token = jwt.sign({ email: result.email, id: result._id }, secret, {
      expiresIn: "10h",
    });

    return res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });

    console.log(error);
  }
};
