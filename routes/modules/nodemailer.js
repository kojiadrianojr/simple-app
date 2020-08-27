// require('dotenv').config();
const Nodemailer = require("nodemailer");

const email = process.env.AUTH_EMAIL;
const pass = process.env.AUTH_PASSWORD;

module.exports = function (payload) {
  let transporter = Nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: email,
      pass: pass,
    },
  });

  let mailOptions = {
    from: email,
    to: payload.reciepient,
    cc: email,
    subject: "OTP",
    text: `Your one time password: ${payload.otp}`,
  };

  transporter.sendMail(mailOptions, function (err, data) {
    if (err) {
      console.log(err);
    } else {
      console.log('Email sent to '+ payload.reciepient);
    }
  });
};
