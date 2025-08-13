import User from "../model/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/utils.js";
import cloudinary from "../lib/cloudinary.js";

export const signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password)
      return res.status(400).json({ message: "All fields are required" });

    if (password.length < 6)
      return res
        .status(400)
        .json({ message: "Password must be greater than 6" });

    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exist" });

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ name, email, password: hashPassword });

    if (!newUser) return res.status(400).json({ message: "Invalid user data" });

    generateToken(newUser._id, res);
    await newUser.save();
    res.status(201).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      profilePic: newUser.profilePic,
    });
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password)
      return res.status(400).json({ message: "All field are required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "user not exist" });

    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword)
      return res.status(400).json({ message: "incorrect password" });

    generateToken(user._id, res);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      profilePic: user.profilePic,
    });
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(201).json({ message: "logout successful" });
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { profilePic } = req.body;

    const userId = req.user._id;
    if (!profilePic)
      return res.status(400).json({ message: "profile pic required" });

    const uploadPic = await cloudinary.uploader.upload(profilePic);
    const updateUser = await User.findByIdAndUpdate(
      userId,
      { profilePic: uploadPic.secure_url },
      { new: true }
    );

    res.status(201).json(updateUser);
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
};

export const checkUser = (req, res) => {
  try {
    res.status(201).json(req.user);
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
};
