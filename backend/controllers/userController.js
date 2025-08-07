const User = require("../models/userModel");
const mongoose = require("mongoose");
const getUsers = async (req, res) => {
  // console.log("got hit")
  const users = await User.find();
  
  res.json(users);
};

const createUser = async (req, res) => {
  // console.log(req.body)
  if (req.body !== "") {
    const { name, email } = req.body;
  }
  // console.log(name);
  if (name !== "" && email !== "") {
    let newUser = new User({ name, email });
    await newUser.save();
    res.status(201).json({ message: "User created successfully", newUser });
  } else {
    res.status(200).json({ message: "Some Error " });
  }
};

async function getUserById(req,res) {

  try {
    const userId = req.params.id
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      res.status(400);
      throw new Error("Invalid User ID");
    }
    const user = await User.findById(userId);
    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }
    res.json(user);
  } catch (err) {
    next(err);
  }
}

module.exports = { getUsers, createUser, getUserById };
