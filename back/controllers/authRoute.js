const sendMail = require("../lib/sendmail");
const userModal = require("../models/authSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
function check(req, res) {
  res.send("Auth Route is working");
}
async function createUser(req, res) {
  const { email, password, name } = req.body;
  const isExistingUser = await userModal.findOne({ email });
  if (isExistingUser) {
    return res.status(400).json({ message: "User already exists" });
  }
  const hashedPassword = await bcrypt.hash(password, 8);
  //  await sendMail(
  //   email,
  //   "Welcome to Our Service",
  //   `<h1>Hello ${name}, welcome aboard!</h1><p>Thank you for registering with us.</p>`
  // );
  const user = await userModal.create({
    name,
    email,
    password: hashedPassword,
  });

  res.json({
    message: "User created successfully",
    user,
  });
}

async function loginUser(req, res) {
  const { email, password } = req.body;
  const isExistingUser = await userModal.findOne({ email });
  if (isExistingUser) {
    const hashedPassword = await bcrypt.compare(
      password,
      isExistingUser.password
    );
    if (!hashedPassword) {
      return res
        .status(501)
        .json({ message: "password and email is incorrect" });
    }
    const token = jwt.sign({ id: isExistingUser?._id }, "tushar1234");
    res.json({
      message: "User login successfully",
      user: isExistingUser,
      token,
    });
  }
  res.send({ message: "User not found, please register" });
}
async function forgotPassword(req, res) {
  const { email } = req.body;
  const isExistingUser = await userModal.findOne({ email: email });
  const otp = Math.floor(Math.random() * 1000000);
  if (isExistingUser) {
    await sendMail(
      email,
      "forgotpassword",
      `your otp for forgot password is ${otp}`
    );
  }
  return res.send({
    message: "User not found",
  });
}
module.exports = {
  check,
  createUser,
  loginUser,
  forgotPassword
};
