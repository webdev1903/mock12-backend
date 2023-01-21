const express = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const router = express.Router();

const User = require("../models/user.model");

const newToken = (user) => {
  return jwt.sign({ user }, process.env.JWT_SECRET_KEY);
};

router.post("/register", async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(403).send({ message: "user already exists" });
    }
    user = await User.create(req.body);
    return res.status(201).send({ message: "user created successfully" });
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).send({ message: "User doesn't exist" });
    }
    let match = user.comparePassword(req.body.password);
    if (!match) {
      return res.status(401).send({ message: "Invalid Credentails" });
    }
    let token = newToken(user);
    return res.status(200).send({ user, token });
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.get("/getProfile", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    return res.status(200).send({ user, timestamp: Date.now() });
  } catch (error) {
    return res.status(500).send(error);
  }
});

module.exports = router;
