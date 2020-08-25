const route = require("express").Router();
const jwt = require("jsonwebtoken");
const User = require("../models").User;
const validate = require("./modules/validation");
const argon2 = require("argon2");

route.post("/register", async (req, res) => {
  const validation = validate.registerValidation(req.body);
  if (validation.error)
    return res.status(400).json({ msg: validation.error.details[0].message });
  const { name, email, username, password } = req.body;

  const unique_username = await User.findOne({ username: username });
  const unique_email = await User.findOne({ email: email });
  if (unique_username || unique_email)
    return res.status(406).json({ error: `Username or Email already exist!` });

  const hashPass = await argon2.hash(password);
  const user = await new User({
    name,
    email,
    username,
    password: hashPass,
  });

  try {
    const newUser = await user.save();
    res.status(201).json({
      msg: "Registration Complete!",
    });
  } catch (e) {
    res.status(400).json({
      error: e.message,
    });
  }
});

module.exports = route;
