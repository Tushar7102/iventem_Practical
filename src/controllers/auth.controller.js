const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

async function signup(req, res) {
  try {
    const { name, email, password } = req.body || {};
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({
          error: { code: "VALIDATION_ERROR", message: "Name, email, password required" },
        });
    }
    const existing = await User.findOne({ email });
    if (existing) {
      return res
        .status(409)
        .json({ error: { code: "EMAIL_EXISTS", message: "Email already in use" } });
    }
    const passwordHash = await bcrypt.hash(String(password), 10);
    const user = await User.create({ name: String(name), email: String(email).toLowerCase(), passwordHash });
    const token = jwt.sign(
      { sub: String(user._id) },
      process.env.JWT_SECRET || "dev_secret",
      { expiresIn: "7d" }
    );
    return res
      .status(201)
      .json({
        user: { id: String(user._id), name: user.name, email: user.email },
        token,
      });
  } catch {
    return res.status(500).json({ error: { code: "SERVER_ERROR", message: "Could not create user" } });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) {
      return res
        .status(400)
        .json({ error: { code: "VALIDATION_ERROR", message: "Email and password required" } });
    }
    const user = await User.findOne({ email: String(email).toLowerCase() });
    if (!user) {
      return res
        .status(401)
        .json({ error: { code: "INVALID_CREDENTIALS", message: "Invalid email or password" } });
    }
    const ok = await bcrypt.compare(String(password), user.passwordHash);
    if (!ok) {
      return res
        .status(401)
        .json({ error: { code: "INVALID_CREDENTIALS", message: "Invalid email or password" } });
    }
    const token = jwt.sign(
      { sub: String(user._id) },
      process.env.JWT_SECRET || "dev_secret",
      { expiresIn: "7d" }
    );
    return res.json({
      user: { id: String(user._id), name: user.name, email: user.email },
      token,
    });
  } catch {
    return res.status(500).json({ error: { code: "SERVER_ERROR", message: "Could not login" } });
  }
}

module.exports = { signup, login };
