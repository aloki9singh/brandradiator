const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { UserModel } = require("../model/User.model");

const userRouter = express.Router();
require("dotenv").config();

userRouter.get("/", async (req, res) => {
  try {
    const users = await UserModel.find();
    res.send(users);
  } catch (err) {
    res.send({ err: err });
  }
});

userRouter.get("/getProfile/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const user = await UserModel.findById({ _id: id });
    re.send(user);
  } catch (err) {
    console.log({ ERR: err });
  }
});

userRouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const salt = 6;
    bcrypt.hash(password, salt, async (err, hash) => {
      if (err) {
        console.log(err);
      } else {
        const user = new UserModel({ name, email, password: hash });
        await user.save();

        res.status(201).json({
          success: true,
          msg: "Registration Successful",
        });
      }
    });
  } catch (error) {
    console.log({ err: err });
    res.send({
      success: false,
      error: error,
      msg: "Sign In Failed",
    });
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const salt = 6;

    const user = await UserModel.find({ email });
    if (user.length > 0) {
      bcrypt.compare(password, user[0].password, (err, result) => {
        if (result) {
          const token = jwt.sign({ userID: user[0]._id }, process.env.KEY);

          res.status(201).json({
            success: true,
            msg: "Login Successful",
            token: token,
            user: user,
          });
        } else {
          res.status(404).send({
            success: false,
            msg: "Invalid Credentials",
            err: err,
          });
        }
      });
    }
  } catch (error) {
    console.log({ err: err });
    res.status(404).send({
      success: false,
      error: error,
      msg: "Invalid Credentials",
    });
  }
});

module.exports = {
  userRouter,
};
