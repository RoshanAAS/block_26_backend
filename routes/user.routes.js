const express = require("express");
const { UserModel } = require("../model/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userRouter = express.Router();

userRouter.post("/register", (req, res) => {
  const { email, password, name } = req.body;

  try {
    bcrypt.hash(password, 5, async (err, hash) => {
      if (err) {
        res.json({ msg: err.message });
      } else {
        const newuser = new UserModel({ email, name, password: hash });

        await newuser.save();
        res.json({ msg: "user has been registerd" });
      }
    });
  } catch (error) {
    res.json({ msg: error.message });
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });

    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          const token = jwt.sign({userId:user._id,username:user.name}, "roshan", {
            expiresIn: "7d",
          });

          res.status(200).json({ msg: "Logged in!!", token });
        } else {
          res.status(200).json({ msg: "wrong credentials" });
        }
      });
    } else {
      res.status(200).json({ msg: "user dose not exist" });
    }
  } catch (error) {
    res.json({ msg: error.message });
  }
});

module.exports = { userRouter };
