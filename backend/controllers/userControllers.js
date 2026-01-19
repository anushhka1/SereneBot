import jwt from "jsonwebtoken";
import User from "../models/User.js"

// Login controller
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ message: "User not found" });
    if (user.password !== password)
      return res.status(400).json({ message: "Invalid password" });

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({ token, user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Fetch Profile


// Fetch Profile
export const myprofile = async (req, res) => {
  try {
    // req.user comes from isAuth middleware
    const user = req.user;

    // send only the fields you want
    res.json({
      name: user.name,
      email: user.email,
      createdAt: user.createdAt
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
