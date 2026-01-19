import express from "express";
import  User  from "../models/User.js";
import jwt from "jsonwebtoken";
import { isAuth } from "../middlewares/auth.js";

const router = express.Router();

// SignUp Routes
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists!" });

    const newUser = await User.create({ name, email, password });
    res.status(201).json({ message: "User registered!", user: newUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login Route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "No record found!" });

    if (user.password !== password)
      return res.status(400).json({ message: "The password is incorrect :(" });

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Profile Route
router.get("/me", isAuth, async (req, res) => {
  try {
    const user = req.user;
    res.json({
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
