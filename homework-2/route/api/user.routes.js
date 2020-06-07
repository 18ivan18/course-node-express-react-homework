const express = require("express");
const router = express.Router();
const User = require("../../models/userSchema");
const mongoose = require("mongoose");
const error = require("../../utils").error;

router.get("/", async (req, res) => {
  console.log(`get all`);
  try {
    const users = await User.find();
    users.map((user) => delete user.password);
    res.json({ users, success: true });
  } catch (err) {
    error(req, res, 500, "Error while retrieving users", err);
  }
});

router.get("/:userId/", async (req, res) => {
  console.log(`get by user id ` + req.params.userId);
  try {
    let user = await User.findById(req.params.userId);
    delete user.password;
    res.json({ user, success: true });
  } catch (err) {
    error(
      req,
      res,
      500,
      `Error while retrieving user ${req.params.userId}`,
      err
    );
  }
});

router.delete("/:userId/", async (req, res) => {
  console.log(`delete by user id ` + req.params.userId);
  try {
    await User.findByIdAndDelete(req.params.userId);
    res.sendStatus(204);
  } catch (err) {
    error(req, res, 500, `Error while deleting user ${req.params.userId}`, err);
  }
});

router.put("/:userId/", async (req, res) => {
  console.log("Editing", req.body)
  try {
    const result = await User.findByIdAndUpdate(
      req.params.userId,
      {
        ...req.body,
        modificationDate: new Date(),
      },
      { useFindAndModify: false, runValidators: true }
    );
    if (result) {
      return res.status(204).json({ success: true });
    }
    error(req, res, 500, `Nothing was modified`);
  } catch (err) {
    error(req, res, 500, err.message, err);
  }
});

router.post("/", async (req, res) => {
  //get in data base
  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    ...req.body,
  });
  try {
    const result = await user.save();
    res.status(201).json({
      success: true,
      message: "Signed up",
      result: result,
    });
  } catch (err) {
    error(req, res, 500, err.message, err);
  }
});

router.post("/signin", async (req, res) => {
  // console.log("req body", req.body);
  let { email, password } = req.body;
  if (!email) {
    return res.status(500).json({
      success: false,
      message: "Error: Email cannot be blank.",
    });
  }
  if (!password) {
    return res.status(500).send({
      success: false,
      message: "Error: Password cannot be blank.",
    });
  }
  email = email.toLowerCase();
  email = email.trim();
  try {
    const users = await User.find({
      email: email,
    });
    if (users.length != 1) {
      return res.json({
        success: false,
        message: "Error: Invalid username",
      });
    }
    const user = users[0];
    if (user.password !== password) {
      return res.json({
        success: false,
        message: "Error: wrong password",
      });
    }
    res.json({
      success: true,
      user: user,
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
