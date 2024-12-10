const express = require("express");
const router = express.Router();
const fs = require("fs");
const FileType = require("file-type");
const Profile = require("../models/profile.model");
const Post = require("../models/post.model");
const Followers = require("../models/follower.model");
const { uploadFile, getGoogleTrends } = require("./helper.js");
const multiparty = require("multiparty");
const { createSocketConnection } = require("../services/socket.service.js");
const { getProfileDetails } = require("../queries");
String.prototype.toObjectId = function() {
  var ObjectId = require("mongoose").Types.ObjectId;
  return new ObjectId(this.toString());
};

router.get("/", async (req, res) => {
  try {
    const userId = req.user.id;

    try {
      const profile = await Profile.findOne(
        { userId: userId.toObjectId() },
        {
          posts: 0,
          views: 0,
          profileType: 0,
          userId: 0,
        }
      ).lean()
        .exec();
      if (!profile) {
        return res.status(404).json({
          message: "Profile does not exist.",
        });
      }
      const ws = await createSocketConnection("login", userId);
      res.status(200).json({
        message: "SUCCESS",
        profile: {
          ...profile,
          ws,
        },
      });
    } catch (e) {
      console.log("error in fetching profile", e);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Something went wrong.",
    });
  }
});


router.get("/profileDetails", async (req, res) => {
  try {
    const profileId = req.user._pid;
    //get last 5 post and add pagination on it
    if (!profileId) {
      throw new Error("Bad Request");
    }
    const { posts, followers, following } = await getProfileDetails(profileId);
    res.status(200).json({
      message: "success",
      posts,
      followers,
      following,
    });
    //get profile deatils of user, liked
    //personal posts, views,followers, following, likedPosts, joined, city, country, age, socials, bookmarked posts, recently viewed, products
  } catch (e) {
    res.status(403).json({
      message: "error in request",
      error: e.message,
    });
  }
});

router.get("/getClientProfileDetails", async (req, res) => {
  try {
    const profileId = req.user._pid;
    //get last 5 post and add pagination on it
    if (!profileId) {
      throw new Error("Bad Request");
    }
    const posts = await Post.find({ author: profileId })
      .populate("author")
      .sort("-createdAt")
      .limit(10);

    const followers = await Followers.find({ author: profileId });
    const following = await Followers.find({ followerId: profileId });
    res.status(200).json({
      message: "success",
      posts,
      followers,
      following,
    });
  } catch (e) {
    res.status(500).json({
      message: "error",
    });
  }
});

router.put("/edit/:editType/:_uid", async (req, res) => {
  try {
    const _uid = req.params._uid;
    const editType = req.params.editType;
    if (!editType || !_uid) {
      res.status(402).json({
        message: "Bad Request",
      });
    }

    const updatedData = req.body;

    if (editType === "image") {
      var form = new multiparty.Form();
      let uploadedData;
      await form.parse(req, async (err, fields, files) => {
        const path = files.file[0].path;
        const buffer = fs.readFileSync(path);
        const type = await FileType.fromBuffer(buffer);
        const fileName = `profile/${Date.now().toString()}`;
        uploadedData = await uploadFile(buffer, fileName, type);
        const fileUrl = uploadedData.Location;

        const profile = await Profile.findOneAndUpdate(
          { userId: { _id: _uid } },
          {
            profileImageUrl: fileUrl,
          },
          { new: true }
        );

        res.status(200).json({
          message: "Profile updated successfully.",
          profile,
        });
      });
    } else if (editType === "cover") {
    } else {
      const {
        headLine,
        firstName,
        lastName,
        social,
        interest,
        industry,
        bio,
      } = req.body;
      let updatedParam = {
        ...(headLine ? { headLine: headLine } : {}),
        ...(firstName ? { firstName: firstName } : {}),
        ...(lastName ? { lastName: lastName } : {}),
        ...(interest ? { interest: interest } : {}),
        ...(industry ? { industry: industry } : {}),
        ...(bio ? { bio: bio } : {}),
        ...(social ? { social: social } : {}),
      }
      //check here to malformed data
      const profile = await Profile.findOneAndUpdate(
        { userId: { _id: _uid } },
        {
          ...updatedParam,
        },
        { new: true }
      );
      res.status(200).json({
        message: "Profile updated successfully.",
        profile,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Something went wrong.",
    });
  }
});

router.get("/news/current", async (req, res) => {
  try {
    const news = await getGoogleTrends();
    console.log(news);
    res.status(200).json({
      message: "SUCCESS",
      news,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      message: "ERROR",
    });
  }
});

module.exports = router;
