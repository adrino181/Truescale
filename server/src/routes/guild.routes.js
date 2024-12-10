const express = require("express");
const router = express.Router();
const UserDao = require("./userDao");
const verifyAuthentication = require("../middlewares/auth.middleware");

// api to create a guild
// User -> Profile -> Guild1, Guild2, Guild3, Guild5
// Guild -> Members -> Profile1, Profile2, Profile3
// Profile -> Post -> Guild
// Profile -> Post -> Wall
// Profile -> Post -> Event
// Guild -> Admin -> [profile1, profile2, profile3] admin can remove people
// Profile -> Request -> Guild

// api to get all guild
// api to follow a guild
// api to unfollow a guild
// api to join a guild
// api to add admin in a guild
// api to remove people from guild
// api to add post in guild
// api to show Members
// api to get user guild
// api to delete guild

router.post("/create", async (req, res) => {
  try {
    const pid = req.userId._pid;
    const guild = await UserDao.createGuild(params);
    res.status(200).json({
      message: "SUCCESS",
      guild,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong!",
      error: error.message,
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const pid = req.userId._pid;
    const guild = await UserDao.createGuild(params);
    res.status(200).json({
      message: "SUCCESS",
      guild,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong!",
      error: error.message,
    });
  }
});

router.get("/trending", async (req, res) => {
  try {
    const website = generateUniqueSubdomain(params.username);
    Object.assign(params, { userId: userId._id });
    Object.assign(params, { website: website });
    const profile = await UserDao.createProfile(params);
    const subdomain = await createCustomSubdomain(profile.handle);
    const profileToken = await generateAuthToken(userId._id, profile._id);
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

router.get("/trendingPost", async (req, res) => {
  try {
    const website = generateUniqueSubdomain(params.username);
    Object.assign(params, { userId: userId._id });
    Object.assign(params, { website: website });
    const profile = await UserDao.createProfile(params);
    const subdomain = await createCustomSubdomain(profile.handle);
    const profileToken = await generateAuthToken(userId._id, profile._id);
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
