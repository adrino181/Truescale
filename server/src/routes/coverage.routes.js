const express = require("express");
const router = express.Router();
const Coverage = require("../models/coverage.model");
const {parseCoverage} = require("./helper");

router.get("/:userId", async (req, res) => {
  try {
    const queryPage = req.query.page ? req.query.page : 0;
    const perPage = 20
  , page = Math.max(0, queryPage)

const coverage  = await Coverage.find({user: req.params.userId, coverageMetaData: {$exists: true, $type: 'object', $ne:{} }})
    .limit(perPage)
    .skip(perPage * page)
    .lean()
    .exec();
  const total = await Coverage.count();


    res.status(200).json({
      message: "SUCCESS",
      response: {coverage: coverage, page: page, limit: perPage, total: total},
    });
  } catch (error) {

    res.status(500).json({
      message: "ERROR",
      error: error.message,
    });
  }
});

router.post("/:postId", async (req, res) => {
  try {
    const postId = req.params.postId;
    const author = req.user._id;
    const comment = await new Comment({ postId, author, text: req.body.text });
    await comment.save();
    res.status(201).json({
      message: "Comment created successfully.",
      response: {
        comment,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Something went wrong.",
      error: error.message,
    });
  }
});

module.exports = router;
