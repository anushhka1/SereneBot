// const mongoose = require('mongoose')

// const userSchema = new mongoose.Schema({
//     name: String,
//     email: String,
//     password: String
// })

// const userModel = mongoose.model("users",userSchema)
// module.exports = userModel

import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
export default User;
