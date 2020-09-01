const route = require("express").Router();
const jwt = require("jsonwebtoken");
const Argon2 = require("argon2");
const Speakeasy = require("speakeasy");
const User = require("../models").User;
const validate = require("./modules/validation");
const modules = require("./modules");
const jwt_secret = process.env.JWT_SECRET;

route.post("/register", async (req, res) => {
  const validation = validate.registerValidation(req.body);
  if (validation.error)
    return res.status(400).send({ error: validation.error.details[0].message });
  const { name, email, username, password } = req.body;

  const unique_username = await User.findOne({ username: username });
  const unique_email = await User.findOne({ email: email });
  if (unique_username || unique_email)
    return res.status(406).send({ error: `Username or Email already exist!` });

  const hashPass = await Argon2.hash(password);
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

route.post("/login", async (req, res) => {
  let validation = validate.loginValidation(req.body);
  if (validation.error)
    return res.status(400).json({ validation_error: validation.error.details[0].message });
  const { username, password } = req.body;
  try {
    let checkUser = await User.findOne({ username });
    if (!checkUser)
      return res
        .status(400)
        .json({ msg: "Incorrect username/password, please check." });
    let checkPass = await Argon2.verify(checkUser.password, password);
    if (!checkPass)
      return res
        .status(400)
        .json({ msg: "Incorrect username/password, please check" });
    if (checkUser.otp_secret) {
      let token = Speakeasy.totp({
        secret: checkUser.otp_secret,
        encoding: "base32",
      });
      modules.NodeMailer({ reciepient: checkUser.email, otp: token });
    }
    let jwt_token = jwt.sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 60,
        username,
        password,
      },
      jwt_secret
    );
    res.status(200).json({
      jwt_token,
      userInfo: {
        name: checkUser.name,
        email: checkUser.email,
        id: checkUser.id,
        otp_enabled: checkUser.otp_enabled,
      },
    });
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

route.patch("/manage_otp/:id", findUser, async (req, res) => {
  let msg;
  const otp_secret = Speakeasy.generateSecret({
    length: 20,
  });
  if (res.user.otp_secret) {
    res.user.otp_secret = "";
    res.user.otp_enabled = false;
    msg = "OTP Disabled";
  } else {
    res.user.otp_enabled = true;
    res.user.otp_secret = otp_secret.base32;
    msg = "OTP Enabled";
  }

  try {
    const updatedUser = res.user.save();
    res.json({ msg });
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

route.post("/validate_otp/:id", findUser, (req, res) => {
  const { token } = req.body;
  try {
    let otp_granted = Speakeasy.totp.verify({
      secret: res.user.otp_secret,
      encoding: "base32",
      token: token,
      window: 0,
    });
    res.send({ otp_granted });
  } catch (e) {
    res.json({ msg: e.message });
  }
});

async function findUser(req, res, next) {
  let user;
  try {
    user = await User.findById(req.params.id);
    if (!user) res.status(404).json({ msg: "User not found" });
  } catch (e) {
    res.status(500).json({ msg: e.message });
  }
  res.user = user;
  next();
}
module.exports = route;
