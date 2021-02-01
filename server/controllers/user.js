import User from "../models/user.js";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const { validationResult } = require("express-validator/check");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json(user);
  } catch (e) {
    res.send({ message: "Error in Fetching user" });
  }
};

export const getUsers = async (req, res) => {
  try {
    const username = req.query.user;
    const oneUser = await User.findOne({
      username,
    }).select("-password");

    const users = await User.find().select("-password");

    if (username) {
      console.log(oneUser);
      res.status(201).json(oneUser);
    } else {
      res.status(201).json(users);
    }
  } catch (error) {
    res.status(404).json({
      message: "error",
    });
  }
};

export const userLogin = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  const { username, password } = req.body;
  try {
    let user = await User.findOne({
      username,
    });
    if (!user)
      return res.status(400).json({
        msg: "Username or password is incorrect",
      });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({
        msg: "Incorrect Password !",
      });

    const payload = {
      user: {
        id: user.id,
      },
    };

    const userResponse = {
      _id: user.id,
      createdAt: user.createdAt,
      email: user.email,
      username: user.username,
    };

    jwt.sign(
      payload,
      "randomString",
      {
        expiresIn: 3600,
      },
      (err, token) => {
        if (err) throw err;
        res.status(200).json({
          token,
          userResponse,
        });
      }
    );
  } catch (e) {
    console.error(e);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

export const userRegister = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  const { username, email, password } = req.body;
  try {
    var user = await User.findOne({
      email,
    });
    var usernameCheck = await User.findOne({
      username,
    });
    if (user) {
      return res.status(400).json({
        msg: "Email Already Exists",
      });
    } else if (usernameCheck) {
      return res.status(400).json({
        msg: "Username Already Exists",
      });
    }

    user = new User({
      username,
      email,
      password,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const payload = {
      user: {
        id: user.id,
      },
    };
    const userResponse = {
      _id: user.id,
      createdAt: user.createdAt,
      email: user.email,
      username: user.username,
    };

    jwt.sign(
      payload,
      "randomString",
      {
        expiresIn: 10000,
      },
      (err, token) => {
        if (err) throw err;
        res.status(200).json({
          token,
          userResponse,
        });
      }
    );
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Error in Saving");
  }
};
