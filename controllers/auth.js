const User = require("../models/auth");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { SECRET } = process.env;

exports.register = async (req, res) => {
  try {
    req.body.password = await bcrypt.hash(req.body.password, 10);

    const user = await User.create(req.body);

    res.status(200).json({
      status: "successful",
      user,
    });
  } catch (error) {
    res.status(400).json({ error });
  }
};

exports.login = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    if (user) {
      const result = await bcrypt.compare(req.body.password, user.password);
      if (result) {
        const token = jwt.sign({ username: user.username }, SECRET);
        res.status(200).json({
          status: "successful",
          user,
          token,
        });
      } else {
        res
          .status(400)
          .json({ status: "fail", error: "username of password not correct" });
      }
    } else {
      res.status(400).json({ status: "fail", error: "User doesn't exist" });
    }
  } catch (error) {
    res.status(400).json({ status: "fail", error });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();

    res.json(users);
  } catch (error) {
    console.log(error);
  }
};
