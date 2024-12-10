const express = require("express");
const router = express.Router();
const Post = require("../models/post.model");
const Like = require("../models/like.model");
const Profile = require("../models/profile.model");
const multiparty = require("multiparty");
const FileType = require("file-type");
const fs = require("fs");
const { uploadFile } = require("./helper.js");
const verifyAuthentication = require("../middlewares/auth.middleware");
const PostRefine = require("../utils/post.util");
const mongoose = require("mongoose");
const { getPostData, getTrendingPosts } = require("../queries");
const verifyAuthToken = require("../utils/verifyAuthToken");
/*{
 get all the tags
 get unique 2 tags
 [
  {
    id: 'saas'
    slug: 'saas',
    data: [{
      id, postdata, tags
    }]
  },
  {
    id: 'saas'
    slug: 'saas',
    data: [{
      id, postdata, tags.
    }]
  },
 ]
}*/
router.get("/homepageTrending", async (req, res) => {
  const commonParamList = {
    likesCount: "$likesCount",
    commentsCount: "$commentsCount",
    views: "$views",
    author: "$author",
    createdAt: "$createdAt",
    likesCount: "$likesCount",
    likes: "$likes",
    userId: "$userId",
    postData: "$postData",
    username: "$username",
  };

  const commonParam = {
    _id: "$_id",
    blockData: { $first: "$blockData" },
    likesCount: { $first: "$likesCount" },
    commentsCount: { $first: "$commentsCount" },
    views: { $first: "$views" },
    author: { $first: "$author" },
    tags: { $first: "$tags" },
    createdAt: { $first: "$createdAt" },
    likesCount: { $first: "$likesCount" },
    likes: { $first: "$likes" },
    userId: { $first: "$userId" },
    postData: { $first: "$postData" },
    username: { $first: "$userId.username" },
  };

  const projectParam = (parentParam) => ({
    blockData: 1,
    likesCount: 1,
    _id: 1,
    createdAt: 1,
    username: 1,
    tags: 1,
    isLiked: 1,
    commentsCount: 1,
    views: 1,
    author: {
      _id: 1,
      firstName: 1,
      lastName: 1,
      location: 1,
      bio: 1,
      profileImageUrl: 1,
      backgroundImageUrl: 1,
      handle: 1,
    },
    postData: 1,
  });
  try {
    const posts = await Post.aggregate([
      { $match: {} },
      {
        $redact: {
          $cond: [{ $gte: [{ $size: "$likes" }, 0] }, "$$KEEP", "$$PRUNE"],
        },
      },
      {
        $lookup: {
          from: "profiles",
          localField: "author",
          foreignField: "_id",
          as: "postAuthor",
        },
      },
      { $unwind: "$postAuthor" },
      {
        $group: {
          ...commonParam,
          author: { $first: "$postAuthor" },
          userId: { $first: "$postAuthor.userId" },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "postUserData",
        },
      },
      { $unwind: "$postUserData" },
      {
        $group: {
          ...commonParam,
          username: { $first: "$postUserData.username" },
          userId: { $first: "$postUserData" },
        },
      },
      { $unwind: "$likes" },
      {
        $lookup: {
          from: "likes",
          localField: "likes",
          foreignField: "_id",
          as: "likeWithAuthor",
        },
      },
      { $unwind: "$likeWithAuthor" },
      {
        $group: {
          ...commonParam,
          likes: { $addToSet: "$likeWithAuthor.author" },
        },
      },
      { $limit: 20 },
      { $unwind: "$tags" },
      { $unwind: "$tags" },
      {
        $group: {
          _id: "$tags",
          count: { $sum: 1 },
          documents: { $addToSet: { _id: "$_id", ...commonParamList } },
        },
      },
      { $sort: { count: -1 } },
      {
        $project: {
          category: "$_id",
          count: 1,
          documents: { ...projectParam("$documents") },
        },
      },
    ]);

    const tempPosts = [];
    const uniqueArr = [];
    for (const post of posts) {
      const postObject = {
        category: post.category,
        documents: [],
      };
      let isEmpty = true;
      for (const item of post.documents) {
        if (uniqueArr.some((ele) => ele === item._id.valueOf())) {
          continue;
        }
        isEmpty = false;
        postObject.documents.push(item);
        uniqueArr.push(item._id.valueOf());
      }
      if (!isEmpty) {
        tempPosts.push(postObject);
      }
    }

    res.status(200).json({
      posts: [...tempPosts],
      message: "Posts fetched successfully.",
    });
  } catch (error) {
    res.status(403).json({
      message: "Something went wrong.",
      error: error.message,
    });
  }
});

router.get("/", verifyAuthentication, async (req, res) => {
  try {
    const profileId = req.user._pid;
    //create a query to sort data in three sections, (stats: (post_count, bookmarked_count)posts, claps, saved, shares)
    const posts = await Post.find({ author: profileId })
      .sort({ createdAt: -1 })
      .populate("author", "_id createdAt name updatedAt")
      .exec();

    const updatedPosts = posts.map((post) => {
      if (post.likes.includes(profileId)) {
        post.isLiked = true;
      }
      return post;
    });
    res.status(200).json({
      response: {
        posts: updatedPosts,
      },
      message: "Posts fetched successfully.",
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong.",
      error: error.message,
    });
  }
});

/**
 * Service to display most recent feed from everywhere/ recommendation/etc..
 */
router.get("/trending", verifyAuthentication, async (req, res) => {
  try {
    const profileId = req?.user?._pid;
    if (!profileId) {
      throw new Error("Cant find profile");
    }
    const filters = req.query;
    console.log('this is trending with filters')
    const posts = await getTrendingPosts(filters, profileId);

    res.status(200).json({
      response: {
        posts: posts,
      },
      message: "Posts fetched successfully.",
    });
  } catch (error) {
    res.status(403).json({
      message: "Something went wrong.",
      error: error.message,
    });
  }
});

router.get("/feed/rssFeed", async (req, res) => {
  try {
    const filters = req?.body;
    const limit = 8;
    const { pageCount } = filters;
    const skip = (pageCount || 0) * 8;

    const posts = await Post.aggregate([
      // {
      //       $match : {
      //         "author":  {$not: {$eq: mongoose.Types.ObjectId(profileId)}}
      //       }
      //   },
      {
        $redact: {
          $cond: [{ $gte: [{ $size: "$likes" }, 1] }, "$$KEEP", "$$PRUNE"],
        },
      },
      {
        $lookup: {
          from: "profiles",
          localField: "author",
          foreignField: "_id",
          as: "author",
        },
      },
      {
        $project: {
          likesCount: 1,
          createdAt: 1,
          tags: 1,
          author: { $first: "$author" },
          postData: 1,
        },
      },
      {
        $project: {
          blockData: 1,
          likesCount: 1,
          createdAt: 1,
          tags: 1,
          isLiked: 1,
          commentsCount: 1,
          views: 1,
          author: {
            _id: "$author._id",
            firstName: "$author.firstName",
            lastName: "$author.lastName",
            headLine: 1,
            location: "$author.location",
            bio: "$author.bio",
            profileImageUrl: "$author.profileImageUrl",
            backgroundImageUrl: "$author.backgroundImageUrl",
            handle: "$author.handle",
          },
          postData: 1,
        },
      },
      { $sort: { createdAt: -1 } },
      { $skip: skip },
    ]);

    res.status(200).json({
      posts: posts,
      message: "Posts fetched successfully.",
    });
  } catch (error) {
    res.status(403).json({
      message: "Something went wrong.",
      error: error.message,
    });
  }
});

router.put("/image/post", verifyAuthentication, async (req, res) => {
  try {
    const fileType = req.body.type || "image";
    const updatedData = req.body;
    if (fileType === "image") {
      var form = new multiparty.Form();
      let uploadedData;
      await form.parse(req, async (err, fields, files) => {
        const path = files.file[0].path;

        const buffer = fs.readFileSync(path);

        const type = await FileType.fromBuffer(buffer);

        const fileName = `post/${Date.now().toString()}`;

        uploadedData = await uploadFile(buffer, fileName, type);
        const fileUrl = uploadedData.Location;
        res.status(200).json({
          message: "SUCCESS",
          fileUrl: fileUrl,
        });
      });
    } else if (fileType === "cover") {
    } else {
    }
  } catch (error) {
    res.status(500).json({
      message: "ERROR",
    });
  }
});

router.get("/:id", async (req, res) => {
  let userId = null;
  try {
    const bearerToken = req.headers["authorization"];
    if (!bearerToken) {
      throw new Error("Auth Error");
    }
    const token = bearerToken.split(" ")[1];
    const data = await verifyAuthToken(token);
    userId = data._pid;
  } catch (e) {
    console.log(e);
  }

  try {
    const postId = req.params.id;
    const post = await getPostData(postId, userId);
    if (!post || !post.length) {
      res.status(404).json({
        message: "Post not found",
        error: err.message,
      });
    }
    const data = post[0];
    res.status(200).json({
      response: {
        post: { ...data },
      },
      message: "Post fetched successfully.",
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong.",
      error: error.message,
    });
  }
});

router.post("/", verifyAuthentication, async (req, res) => {
  try {
    const userId = req.user._id;
    const username = req.user.username;
    const author = await Profile.findOne({ userId: userId });
    if (!author) {
      res.status(404).json({
        message: "Profile not found",
        error: "Not verified user",
      });
    }
    const postRefine = new PostRefine({ username }, author, req.body);
    const blockData = req?.body?.blockData;
    if (!blockData || !blockData.length) {
      throw new Error("Invalid data");
    }
    const data = await postRefine.createPost();
    if (data.error) {
      throw new Error("Error in creating Post");
    }

    res.status(201).json({
      response: {
        ...data,
      },
      message: "Post created successfully.",
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong.",
      error: error.message,
    });
  }
});

router.put("/:id", verifyAuthentication, async (req, res) => {
  try {
    const userId = req.user._id;
    const username = req.user.username;
    const postId = req.params.id;
    const author = await Profile.findOne({ userId: userId });
    if (!author) {
      res.status(404).json({
        message: "Profile not found",
        error: "Not verified user",
      });
    }
    const postRefine = new PostRefine({ username }, author, req.body);
    const blockData = req?.body?.blockData;
    if (!blockData || !blockData.length) {
      throw new Error("Invalid data");
    }
    const data = await postRefine.editPost(postId);
    if (data.error) {
      throw new Error("Error in creating Post");
    }

    res.status(200).json({
      response: {
        ...data,
      },
      message: "Post created successfully.",
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong.",
      error: error.message,
    });
  }
});

router.delete("/:id", verifyAuthentication, async (req, res) => {
  try {
    const userId = req.user._pid;
    const id = req.params.id;

    const post = await Post.findOneAndDelete(
      { _id: id, author: userId },
      "_id"
    );
    if (!post) {
      throw new Error("Post couldn't be found.");
    }
    res.status(200).json({
      response: {
        post,
      },
      message: "SUCCESS",
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong.",
      error: error.message,
    });
  }
});

/* like and unlike a post
   checks if like exist and if it exist then remove it else update it in likes and posts.
*/
router.post("/likes", verifyAuthentication, async (req, res) => {
  try {
    const profileId = req.user._pid;
    const postId = req.body.id;
    if (!profileId) {
      return res.status(404).json({
        message: "Post couldn't be found.",
      });
    }

    const foundLike = await Like.findOne({ postId: postId, author: profileId });

    let isLiked = false;
    let likeId = null;
    if (!foundLike) {
      isLiked = true;
      const newLike = await new Like({ postId: postId, author: profileId });
      likeId = newLike._id;
      await newLike.save();
    } else {
      isLiked = false;
      const deleteLike = await Like.findOneAndDelete({
        postId: postId,
        author: profileId,
      });
      likeId = deleteLike._id;
    }
    //update the 'post' depending on 'like' interest and return the 'post'.
    //will affect only 'like' attributes in Post i.e (likeCount, likes)
    const update = {};
    const post = await Post.findOneAndUpdate(
      { _id: postId },
      {
        $addToSet: { likes: [likeId] },
        $inc: { likesCount: isLiked ? 1 : -1 },
        $set: { isLiked: isLiked },
      },
      { new: true }
    ).select("likes _id likesCount");

    if (!isLiked) {
      const foundIndex = await post.likes.indexOf(foundLike._id);
      post.likes.splice(foundIndex, 1);
    }

    await post.save();
    res.status(200).json({
      response: true,
      message: "SUCCESS",
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong.",
      error: error.message,
    });
  }
});

module.exports = router;
