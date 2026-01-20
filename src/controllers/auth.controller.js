const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

async function signup(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ error: { code: "VALIDATION_ERROR", message: "Invalid input" } });
  }
  const { name, email, password } = req.body;
  const existing = await User.findOne({ email });
  if (existing) {
    return res
      .status(409)
      .json({
        error: { code: "EMAIL_EXISTS", message: "Email already in use" },
      });
  }
  const passwordHash = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, passwordHash });
  const token = jwt.sign(
    { sub: String(user._id) },
    process.env.JWT_SECRET || "dev_secret",
    { expiresIn: "7d" },
  );
  return res
    .status(201)
    .json({
      user: { id: String(user._id), name: user.name, email: user.email },
      token,
    });
}

async function login(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ error: { code: "VALIDATION_ERROR", message: "Invalid input" } });
  }
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res
      .status(401)
      .json({
        error: {
          code: "INVALID_CREDENTIALS",
          message: "Invalid email or password",
        },
      });
  }
  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) {
    return res
      .status(401)
      .json({
        error: {
          code: "INVALID_CREDENTIALS",
          message: "Invalid email or password",
        },
      });
  }
  const token = jwt.sign(
    { sub: String(user._id) },
    process.env.JWT_SECRET || "dev_secret",
    { expiresIn: "7d" },
  );
  return res.json({
    user: { id: String(user._id), name: user.name, email: user.email },
    token,
  });
}

module.exports = { signup, login };
