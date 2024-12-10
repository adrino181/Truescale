const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const privateKey = process.env.JWT_KEY;


const verifyAuthentication = async (req, res, next) => {
  try {
    const bearerToken = req.headers["authorization"];
    if (!bearerToken) {
      throw new Error("AUTH_ERROR");
    }
    const token = bearerToken.split(" ")[1];
    console.log('this is token to be verify', token)
    const decoded = jwt.verify(token, privateKey);
    console.log('this is decoded token de', decoded)
    const userObj = await User.findById(decoded._id);
    if (userObj) {
      req.user = userObj;
      if (userObj.authDetails.isVerified) {
        if (!decoded._pid) {
          throw Error("PROFILE_INCOMPLETE");
        }
        req.user._pid = decoded._pid
        next();
      } else {
        throw Error("VERIFICATION_NEEDED")
      }
    } else {
      throw Error("Error in finding user");
    }
  } catch (error) {
    switch (error.message) {
      case 'PROFILE_INCOMPLETE':
        res.status(202).json({
          message: "!!!Profile Incomplete!!!",
          status: 'incomplete'
        })
        break;
      case 'VERIFICATION_NEEDED':
        res.status(203).json({
          message: "!!!Verification Incomplete!!!",
          status: 'verify'
        })
        break;
      case 'jwt expired':
        res.status(203).json({
          message: "!!!Token Expired",
          status: 'token_expired'
        })
        break;
      default:
        res.status(401).json({
          message: "!!!Error!!!",
          status: error.message,
        });
    }
  }
};

module.exports = verifyAuthentication;
