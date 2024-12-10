"use strict";
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  port: 465, // Postfix uses port 25
  host: "localhost",
  secure: true,
  tls: {
    rejectUnauthorized: false,
    ciphers: "SSLv3",
  },
  auth: {
    user: "abc",
    pass: "def",
  },
});

var message = {
  from: "noreply@domain.com",
  to: "adrinohere@gmail.com",
  subject: "Confirm Email",
  text: "Please confirm your email",
  html: "<p>Please confirm your email</p>",
};

transporter.verify(function (error, success) {
  if (error) {
    console.log(error);
  } else {
    console.log("Server is ready to take our messages");
    //setup dkim
    transporter.sendMail(message, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log("Message sent: %s", info.messageId);
    });
  }
});
