const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const { generateAuthToken } = require("../utils/generateAuthToken");
const router = express.Router();
const Profile = require("../models/profile.model");
const Follower = require("../models/follower.model");
const Subscribe = require("../models/subscribe.model");
const { ORGANISATION, JOURNALIST, USER } = require("./constant");
const UserDao = require("./userDao");
const verifyAuthToken = require("../utils/verifyAuthToken");
const emailService = require("../services/email.service");
const jwt = require("jsonwebtoken");
const verifyAuthentication = require("../middlewares/auth.middleware");
const AWS = require("aws-sdk");

const emailTransporter = new emailService(
  process.env.AWS_ACCESS_KEY,
  process.env.AWS_SECRET_ACCESS_KEY,
  "ap-south-1"
);

AWS.config.update({ region: process.env.AWS_REGION });

const route53 = new AWS.Route53();
const DNS_NAME = "truescale.in";
const HOSTED_ZONE_ID = process.env.AWS_HOSTED_ZONE_ID;

function generateUniqueSubdomain(subdomain) {
  return `https://${subdomain}.${DNS_NAME}`;
}

async function createCustomSubdomain(subdomain) {
  const params = {
    ChangeBatch: {
      Changes: [
        {
          Action: "CREATE",
          ResourceRecordSet: {
            Name: `${subdomain}.truescale.in`,
            Type: "A",
            AliasTarget: {
              DNSName: DNS_NAME,
              EvaluateTargetHealth: false,
              HostedZoneId: HOSTED_ZONE_ID,
            },
          },
        },
      ],
      Comment: "Creating custom subdomain",
    },
    HostedZoneId: HOSTED_ZONE_ID,
  };

  try {
    const response = await route53.changeResourceRecordSets(params).promise();
    return response;
  } catch (error) {
    throw error;
  }
}

router.post("/domain", async (req, res) => {
  try {
    const username = req.body.username;
    const domainData = await createCustomSubdomain(username);
    res.status(200).json({
      message: "done",
      data: domainData,
    });
  } catch (e) {
    res.status(500).json({
      message: "Error",
    });
  }
});

router.post("/subscribe", async (req, res) => {
  try {
    const subscriber = new Subscribe({ email: req.body.email });
    await subscriber.save();
    return res.status(200).json({
      message: "subscribed",
    });
  } catch (e) {
    return res.status(403).json({
      message: "bad request",
      error: e.message,
    });
  }
});

router.get("/users", async (req, res) => {
  try {
    const decoded = await verifyAuthToken(req.headers["authorization"]);
    if (!decoded || !decoded._id || !decoded._pid) {
      res.status(403).json({
        message: "error",
        error: e.message,
      });
    }
    const profilesCount = await Profile.find({}).count();
    res.status(200).json({
      message: "success",
      data: profilesCount,
    });
  } catch (e) {
    res.status(403).json({
      message: "error",
      error: e.message,
    });
  }
});

router.get("/checkUsername", async (req, res) => {
  try {
    const username = await UserDao.checkUsername(req, res);
    if (username) {
      return res.status(200).json({
        username: username,
        message: "SUCCESS",
      });
    }
  } catch (e) {
    return res.status(404).json({
      message: "Error in request",
    });
  }
});


router.post("/register", async (req, res) => {
  try {
    const { email, password, confirmPassword, credential } = req.body;
    // const foundUser = await User.findOne({ username });
    // if (foundUser) {
    //   return res.status(400).json({
    //     message: "User with this username already exists.",
    //   });
    // }
    if (credential) {
      const { payload } = await UserDao.googleLogin(req, res);
      if (!payload) {
        throw new Error("can't login with google");
      }
      const username = payload.email.split("@")[0];

      const user = await UserDao.createUser({
        ...req.body,
        username: username,
        ...payload,
      });
      if (!user) {
        throw new Error("Error in creating user");
      }
      // emailTransporter.sendOtpEmail({email:user.email, uid:user.uid, type: 'email-confirm'});
      return res.status(201).json({
        message: "User created successfully.",
        response: {
          ...user,
        },
      });
    } else {
      if (password !== confirmPassword || (password?.length || 0) < 8) {
        return res.status(400).json({
          message: "Error in Password",
        });
      }
      const user = await UserDao.createUser({ email, password });
      emailTransporter.sendOtpEmail({
        email: user.email,
        uid: user.uid,
        type: "email-confirm",
      });
      return res.status(201).json({
        message: "User created successfully.",
        response: {
          ...user,
        },
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong!",
      error: error.message,
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    let googleCredential;
    if (req.body.credential) {
      //login with credentials
      googleCredential = await UserDao.googleLogin(req, res);
      req.body.email = googleCredential.payload.email;
      req.body.password = googleCredential.payload.jti;
    }
    const { email, password } = req.body;
    const foundUser = await User.findOne({ email }).exec();
    if (!foundUser) {
      if (req.body.credential) {
        const username = email.split("@")[0];
        const newUser = await UserDao.createUser({
          email,
          password,
          username,
          ...googleCredential.payload,
        });

        //emailTransporter.sendOtpEmail({email: email, uid: newUser.uid, type: 'email-confirm'});
        if (newUser) {
          return res.status(200).json({
            status: "success",
            response: {
              token: newUser.token,
            },
          });
        }
      }
      return res.status(404).json({
        message: "User not found",
      });
    } else {
      const isPasswordValid = await bcrypt.compare(
        password,
        foundUser.password
      );
      if (!isPasswordValid) {
        if (!req.body.credential) {
          return res.status(403).json({
            message: "Incorrect email or password.",
          });
        }
      }
      const profile = await Profile.findOne({ userId: foundUser.id }, "_id");
      const profileId = profile ? profile.id : null;
      const token = generateAuthToken(foundUser._id, profileId);
      return res.status(200).json({
        message: "Logged in successfully.",
        response: {
          token,
        },
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong!",
      error: error.message,
    });
  }
});

router.get("/resendConfirmation", async (req, res) => {
  try {
    const bearer = req.headers.authorization;
    if (!bearer) {
      throw new Error("Error in Request Login");
    }
    const token_str = bearer.split(" ")[1];
    const userId = await verifyAuthToken(token_str);
    if (!userId) {
      throw new Error("Error in Token");
    }
    const user = await User.findOne({ _id: userId._id });
    if (!user) {
      throw new Error("Error in user");
    }
    emailTransporter.sendOtpEmail({
      email: user.email,
      uid: user._id,
      type: "email-confirm",
    });
    res.status(200).json({
      status: "success",
      res: "Message Sent Successfully",
    });
  } catch (e) {
    res.status(500).json({
      status: "failed",
      res: e?.message || "Error in request",
    });
  }
});

router.post("/confirm", async (req, res) => {
  try {
    const { token } = req.body;
    // Verify the email token
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    // Update the user as confirmed
    const verifiedUser = await User.findOneAndUpdate(
      { _id: decoded.userId },
      { "authDetails.isVerified": true },
      { fields: { username: 1 }, returnOriginal: false }
    );
    if (verifiedUser) {
      res.status(200).json({
        message: verifiedUser,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong!",
      error: error.message,
    });
  }
});


router.post("/createProfile", async (req, res) => {
  try {
    const bearer = req.headers.authorization;
    if (!bearer) {
      throw new Error("Error in Request Login");
    }
    const token_str = bearer.split(" ")[1];
    const userId = await verifyAuthToken(token_str);
    if (!userId) {
      throw new Error("Error in Token");
    }
    const user = await User.findOne({ _id: userId._id });
    if (!user) {
      throw new Error("Error in user");
    }
    const params = req.body;
    if (!params) {
      throw new Error("params needed");
    }

    const website = generateUniqueSubdomain(params.username);
    Object.assign(params, { userId: userId._id });
    Object.assign(params, { website: website });
    const trackerData = await UserDao.createWebsite({
      name: params.username,
      domain: website,
      userId: userId._id,
    });
    Object.assign(params, { trackerId: trackerData.id });
    const profile = await UserDao.createProfile(params);
    const subdomain = await createCustomSubdomain(profile.handle);
    const profileToken = generateAuthToken(userId._id, profile._id);
    res.status(200).json({
      message: "SUCCESS",
      token: profileToken,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong!",
      error: error.message,
    });
  }
});

module.exports = router;
