const Post = require("../../models/post.model");
const mongoose = require("mongoose");
const getPosts = async (id) => {
  const { pageCount, limitCount } = {};
  const limit = limitCount || 8;
  const skip = (pageCount || 0) * 8;
  // create feed sorted by date
  // get recommended by following tags
  // get posts liked and have comments by followers
  // get postdata of it and first 10 likes
  // in his country, track by his ip address

  // posts of followers
  const objectId = new mongoose.Types.ObjectId(id)
  return Post.aggregate([
    {
      $match: {
        author: { $eq: objectId },
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
        blockData: 1,
        likesCount: 1,
        createdAt: 1,
        tags: 1,
        isLiked: 1,
        commentsCount: 1,
        views: 1,
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
    { $limit: limit },
  ]);
};

module.exports = getPosts;
