const express = require("express");
const router = express.Router();
const Profile = require("../models/profile.model");
const { getOrchidWall, getOrchidPost } = require("../queries");
const { isValidObjectId } = require("mongoose");



router.post("/auth", async (req, res) => {
})


router.get("/", async (req, res) => {
  try {
    const username = req.query.username;
    if (!username) {
      throw new Error("Bad Username");
    }
    const userProfile = await Profile.findOne({ handle: username });
    if (!userProfile) {
      throw new Error("No User Found");
    }

    res.status(200).json({
      message: "success",
      data: userProfile,
    });
    //send profile
    //image url
    // bio
    // social icons
    // headline
    // tags
  } catch (e) {
    res.status(403).json({
      message: "Bad Request",
    });
  }
});

router.get("/post", async (req, res) => {
  try {
    const postId = req.query.postId;
    if (!isValidObjectId(postId)) {
      throw new Error("Invalid Post Id");
    }
    const data = await getOrchidPost(postId);
    const post = data[0];
    if (!post || !post.post) {
      throw new Error("No Post Found");
    }
    res.status(200).json({
      message: "SUCCESS",
      data: { ...post },
    });
  } catch (e) {
    res.status(404).json({
      message: "ERROR",
      error: e.message,
    });
  }
});

router.get("/getPosts", async (req, res) => {
  try {
    const profileId = req.query.profileId;
    if (!isValidObjectId(profileId)) {
      throw new Error("Invalid Profile");
    }
    const posts = await getOrchidWall(profileId);
    res.status(200).json({
      message: "SUCCESS",
      data: posts,
    });
  } catch (e) {
    res.status(404).json({
      message: "ERROR",
      error: e.message,
    });
  }
});

module.exports = router;
