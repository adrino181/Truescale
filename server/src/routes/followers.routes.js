const express = require("express");
const router = express.Router();
const Follower = require("../models/follower.model");
const { isValidObjectId } = require("mongoose");
const { updateFollower } = require("../queries");

//get recommended followers
router.get("/recommendation", async (req, res) => {
  try {
    const followers = await Follower.find({}).limit(10);
    res.status(200).json({
      message: "Followers fetched successfully.",
      response: {
        followers,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong.",
      error: error.message,
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const follow = req.params.follow;
    const followerId = req.body.pid;
    if (typeof follow !== 'boolean' || !isValidObjectId(userId) || !isValidObjectId(followerId)) {
      throw new Error('Type Errors');
    }
    const followers = await Follower.find({ author: userId, follower: followerId });

    if (!followers && follow) {
      const addFollower = new Follower({ author: userId, follower: followerId });
      addFollower.save();
    }
    if (followers && !follow) {
      await Follower.findOneAndDelete({ author: userId, followerId: followerId });
    }
    res.status(200).json({
      message: "SUCCESS",
      response: "SUCCESS",
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong.",
      error: error.message,
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const userId = req.body.id;
    const followStatus = req.body.follow;
    const followerId = req.user._pid;
    if (typeof followStatus !== 'boolean' || !isValidObjectId(userId) || !isValidObjectId(followerId)) {
      throw new Error('Type Errors');
    }
    await updateFollower(userId, followerId, followStatus);
    res.status(200).json({
      message: "SUCCESS",
      response:  "SUCCESS"
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong.",
      error: error.message,
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const followerId = req.body.pid;
    const authorId = req.body.userId;
    const follower = await Follower.findOneAndDelete({ author: userId, followerId: followerId });
    if (!follower) {
      return res.status(404).json({
        message: "follower does not exist.",
      });
    }
    res.status(200).json({
      message: "Follower removed successfully.",
      response: {
        follower,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong.",
      error: error.message,
    });
  }
});

module.exports = router;
