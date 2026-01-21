const nodemailer = require("nodemailer");
const d = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "tp126090@gmail.com",
    pass: "bleqwxxnmvockged",
  },
});
const sendMail = (to, subject, text) => {
  // Here you would integrate with an actual email service like nodemailer, SendGrid, etc.
  let mail = d.sendMail({
    to: to,
    subject,
    html: text,
  });
  return mail;
};
module.exports = sendMail;
