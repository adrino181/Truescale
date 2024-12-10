const express = require("express");
const router = express.Router();
const fs = require('fs');
const FileType = require('file-type');
const Profile = require("../models/profile.model");
const Post = require("../models/post.model");
const { uploadFile, getGoogleTrends } = require('./helper.js');
const multiparty = require('multiparty');

String.prototype.toObjectId = function() {
  var ObjectId = (require('mongoose').Types.ObjectId);
  return new ObjectId(this.toString());
};

router.get("/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    console.log(userId, 'thsi is user id');
    try{
      const profile = await Profile.findOne
      ({ "userId": userId.toObjectId() }).populate("userId", "-password").exec();
      if (!profile) {
        return res.status(404).json({
          message: "Profile does not exist.",
        });
      }
      const posts = await Post.find({ author: userId }).populate("author").exec();
      profile.posts = posts;
      res.status(200).json({
        message: "Profile fetched successfully.",
        profile,
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


// editTypes {
//   image
//   profile
// }
router.put("/edit/:editType/:_uid", async (req, res) => {
  try {
    const _uid = req.params._uid;
    const editType = req.params.editType;
    if(!editType || !_uid ) {
      res.status(402).json({
        message: "Bad Request",
      });
    }
    const updatedData = req.body;

    if(editType === 'image') {
      var form = new multiparty.Form();
      let uploadedData;
     await form.parse(req, async (err, fields, files)=> {
        const path = files.file[0].path;
        const buffer = fs.readFileSync(path);
        const type = await FileType.fromBuffer(buffer);
        const fileName = `profile/${Date.now().toString()}`;
        uploadedData = await uploadFile(buffer, fileName, type);
        const fileUrl = uploadedData.Location;

        const profile = await Profile.findOneAndUpdate(
           { userId:{ _id: _uid } },
           {
             profileImageUrl: fileUrl,
             bio: 'bio is updated',
           },
           { new: true }
        );

        res.status(200).json({
          message: "Profile updated successfully.",
          profile
        });

      });
    } else if(editType === 'cover') {

    } else {

    }


  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Something went wrong.",
    });
  }
});



router.get("/news/current", async (req, res) => {
    try{
      const news = await getGoogleTrends();
      console.log(news);
      res.status(200).json({
        message: 'SUCCESS',
        news
      });
    }catch (e) {
      console.error(e);
      res.status(500).json({
        message: "ERROR",
      });
    }
});

module.exports = router;
