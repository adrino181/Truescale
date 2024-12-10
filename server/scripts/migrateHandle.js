const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
let count = [];
const Profile = require('../models/profile.model')
const User = require('../models/user.model')
const Post = require('../models/post.model')
const connectToDB = require("../db/db");
const { postWithCount } = require("../queries");
const { default: mongoose } = require("mongoose");
connectToDB('mongodb+srv://adrino:adrino@cluster0.x8icb.gcp.mongodb.net/socialTest');

app.get("/migratehandle", async (req, res) => {
  const profiles = await profile.find().populate('userid').exec();
  for (let i = 0; i < profiles.length; i++) {
    if (profiles[i].userid) {
      //if it doesnt have a handle here then add handle
      console.log('profile', profiles[i].handle)
      if (!profiles[i].handle) {
        console.log('profile', profiles[i].userid.username, profiles[i].handle)
      }
    } else {
      // if it doens't have a user profile delete this profile.
      //await profile.findoneanddelete({_id: profiles[i]._id})        
      console.log('it doenst have user profile', profiles[i].handle)
    }

  }

  res.status(200).json({
    message: "welcome dog",
    response: prof,
  });
});

function* updateCommentGenerator(posts) {
  let itr = 0;
  while (itr < posts.length) {
    yield Post.findOneAndUpdate({ _id: mongoose.Types.ObjectId(posts[itr]._id) }, { $set: { "commentsCount": posts[itr].commentsCount } });
    itr++
  }
}

app.get("/fixCommentsCount", async (req, res) => {
  const posts = await postWithCount();
  (async () => {
    for await (const updatedPost of updateCommentGenerator(posts)) {
      console.log('post updated', updatedPost);
    }
  })();

  res.status(200).json({
    message: "welcome dog",
    response: posts,
  });
});

app.get("/userData", async (req, res) => {
  const users = await User.find().exec();
  const resultProfile = [];
  for (let i = 0; i < users.length; i++) {
    //   if(profiles[i].userId){
    //       //if it doesnt have a handle here then add handle
    //       console.log('profile', profiles[i].handle)
    //       if(!profiles[i].handle){
    //           console.log('profile', profiles[i].userId.username, profiles[i].handle)
    //       }
    //   } else {
    //       // if it doens't have a user profile delete this profile.
    //      //await Profile.findOneAndDelete({_id: profiles[i]._id})        
    //       console.log('It doenst have user profile', profiles[i].handle)
    //   }
    const profile = await Profile.findOne({ handle: users[i]['username'] }).exec();
    //console.log('this is his profile', profile)
    if (!profile) {
      console.log(users[i]['username'], "doesn't have a profile")
    }
    // {
    //     _id: ObjectId('63eda3f30681e66ad5186aa1'),
    //     handle: "sushil"
    // }
  }

  res.status(200).json({
    message: "Welcome dog",
    response: users,
  });
});

app.get('/createProfile', async (req, res) => {
  const posts = await Post.find({ author: '63eda3f30681e66ad5186aa1' }, { _id: 1, blockData: 0, postData: 0, author: 0, createdAt: 0, updatedAt: 0, type: 0, views: 0, commentsCount: 0, comments: 0, likes: 0, tags: 0, isLiked: 0, likesCount: 0, __v: 0 }).exec();
  res.status(200).json({
    message: "Welcome dog",
    response: posts,
  });
})


app.use(cors());
app.use(express.json());


const port = 3004;
app.listen(port, () => console.log(`Listening on port ${port}`));
