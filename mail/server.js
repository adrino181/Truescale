"use strict";
const fs = require("fs");
const SMTPServer = require("smtp-server").SMTPServer;
const nodemailer = require("nodemailer");
const helper = require("./helper");

const sendEmail = async (recipient) => {
  const transportConfig = helper(recipient);
  const transporter = nodemailer.createTransport({
    ...transportConfig,
    tls: {
      rejectUnauthorized: false,
      ciphers: "SSLv3",
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
};

const server = new SMTPServer({
  secure: true,
  key: fs.readFileSync("./scripts/server.key"),
  cert: fs.readFileSync("./scripts/server.crt"),
  onConnect(session, callback) {
    console.log("connected to smtp server", session);
    return callback();
  },
  onClose(session) {
    console.log("closing smtp session", session);
  },
  onSecure(socket, session, callback) {
    console.log("TLS is setup");
    return callback();
  },
  onData(stream, session, callback) {
    //stream.pipe(console.log); // print message to console
    //console.log("this is onData", stream, session, callback);
    //forward it to gmail
    // sendEmail();
    stream.on("data", (buffr) => {
      //callback();
      console.log("----", buffr.toString());
    });

    // stream.on("end", callback);
    stream.on("end", async (...args) => {
      console.log("sending email to gmail");
      await sendEmail("adrinohere@gmail.com");
      callback();
    });
  },
  onAuth(auth, session, callback) {
    if (auth.username !== "abc" || auth.password !== "def") {
      return callback(new Error("Invalid username or password"));
    }
    callback(null, { user: 123 }); // where 123 is the user id or similar property
  },
});

server.listen(465);

server.on("error", (err) => {
  console.log("Error %s", err.message);
});
