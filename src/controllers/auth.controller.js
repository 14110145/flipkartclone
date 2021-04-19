const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");

const generateJwtToken = (_id, role) => {
  return jwt.sign({ _id, role }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

exports.signup = (req, res) => {
  const errors = validationResult(req);

  User.findOne({ email: req.body.email }).exec(async (error, user) => {
    if (user)
      return res.status(400).json({
        message: "User already registered.",
      });

    const { firstName, lastName, email, password } = req.body;
    const hash_password = await bcrypt.hash(password, 10);

    const _user = new User({
      firstName,
      lastName,
      email,
      hash_password,
      userName: Math.random().toString(),
    });

    _user.save((error, user) => {
      if (error)
        return res.status(400).json({
          message: "Some thing went wrong",
        });
      if (user) {
        const token = generateJwtToken(user._id, user.role);
        return res.status(201).json({
          token,
          message: "User created successfully.",
        });
      }
    });
  });
};

exports.signin = (req, res) => {
  User.findOne({ email: req.body.email }).exec(async (error, user) => {
    if (error)
      return res.status(400).json({
        error,
      });
    if (user) {
      let authPassWordUser = await user.authenticate(req.body.password);
      if (authPassWordUser && user.role === "user") {
        const token = generateJwtToken(user._id, user.role);
        const { _id, firstName, lastName, email, role, fullName } = user;
        res.status(200).json({
          token,
          user: { _id, firstName, lastName, email, role, fullName },
        });
      } else {
        return res.status(400).json({ message: "Invalid password." });
      }
    } else {
      return res.status(400).json({ message: "Something went wrong." });
    }
  });
};
