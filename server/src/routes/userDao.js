const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const { generateAuthToken } = require("../utils/generateAuthToken");
const Profile = require("../models/profile.model");
const Guild = require("../models/guild/guild.model");
const { OAuth2Client } = require("google-auth-library");
const { uploadFile } = require("./helper");
const { createWebsite } = require("../queries");
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const client = new OAuth2Client(GOOGLE_CLIENT_ID);

class UserDao {
  static async findAll() {
    return await User.find({});
  }

  static async createProduct() { }

  static async createGuild() {
    const {
      bio,
      headline,
      image,
      profileInterest,
      profileType,
      username,
      userId,
      website,
    } = params;
    if (!username || !website || !userId) {
      throw new Error("params missing");
    }
    const buff = Buffer.from(
      profileImage.replace(/^data:image\/\w+;base64,/, ""),
      "base64"
    );
    const mime = profileImage.split(";")[0].split("/")[1];
    const fileName = `${userId}profilePic`;
    const fileUpload = await uploadFile(
      buff,
      fileName,
      { mime: `image/${mime}`, ext: mime },
      "base64"
    );
    let guild = new Guild({
      userId: userId,
      headline: headline,
      interest: profileInterest,
      industry: profileType,
      profileImageUrl: fileUpload.Location,
      handle: username,
      bio: aboutU,
      website: website,
    });
    await guild.save();
    return guild;
  }

  static async checkUsername(req, res) {
    if (req.query.q) {
      const userFound = await User.find({ username: q });
      if (userFound) {
        throw new Error("Username Not Exist");
      }
      return req.param.q;
    } else {
      throw new Error("Username Not Exist");
    }
  }

  static async createProfile(params) {
    const {
      aboutU,
      headline,
      profileImage,
      profileInterest,
      profileType,
      username,
      userId,
      website,
      trackerId,
    } = params;
    if (!username || !website || !userId) {
      throw new Error("params missing");
    }
    const buff = Buffer.from(
      profileImage.replace(/^data:image\/\w+;base64,/, ""),
      "base64"
    );
    const mime = profileImage.split(";")[0].split("/")[1];
    const fileName = `${userId}profilePic`;
    const fileUpload = await uploadFile(
      buff,
      fileName,
      { mime: `image/${mime}`, ext: mime },
      "base64"
    );

    let profile = new Profile({
      userId: userId,
      headline: headline,
      interest: profileInterest,
      industry: profileType,
      profileImageUrl: fileUpload.Location,
      handle: username,
      bio: aboutU,
      website: website,
      trackerId: trackerId,
    });
    await profile.save();
    return profile;
  }

  static async createUser(data) {
    const { email, jti, credential, password } = data;

    const foundUser = await User.findOne({ email }).exec();
    if (foundUser) {
      throw new Error("User Exist");
    }

    const salt = await bcrypt.genSalt(10);
    const passWordToHash = credential ? jti : password;
    const hashedPassWord = bcrypt.hash(passWordToHash, salt);
    const isVerified = !!(credential || jti);
    let user = new User({
      email: email,
      password: hashedPassWord,
      username: email,
      ...(isVerified ? { authDetails: { isVerified: true } } : {}),
    });
    user = await user.save();
    const token = generateAuthToken(user._id);
    return { token, uid: user._id, email: email };
  }

  static async createWebsite(params) {
    let analyticsMeta;
    try {
      analyticsMeta = await createWebsite(params);
    } catch (e) {
      throw new Error("Error in creating analytics");
    }
    return analyticsMeta;
  }

  // static async createProfile (params) {

  //     console.log('these are params', params);
  // const {name, username, payload, background, industry, password, email } = body || {};

  // const userData = {name, username, password, email};
  // const profileData = {...userData, industry, interest: background, handle: username};
  // //send verfication link from here;
  // profileData.userId = user._id
  // //user has successfully created the login setup.
  // //verify that its not a bot by oauth
  //   let profile =  new Profile(profileData);
  //   profile = await profile.save();
  //   const oauthToken = await generateAuthToken(user._id, profile._id);
  //   return {id: profile._id, email: user.email, uid: user._id, name:user.username, oauthToken};
  // }

  static async googleLogin(req, res) {
    if (req.body.credential) {
      try {
        const ticket = await client.verifyIdToken({
          idToken: req.body.credential,
          audience: GOOGLE_CLIENT_ID,
        });
        return { payload: ticket.getPayload() };
      } catch (error) {
        return res.status(403).json({
          message: "Incorrect details.",
        });
      }
    }
  }

  static deleteUser() { }
}

module.exports = UserDao;
