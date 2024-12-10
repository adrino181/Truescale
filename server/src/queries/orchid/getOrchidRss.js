const mongoose = require('mongoose');
const Post = require("../../models/post.model")

const getOrchidRss = (filters, profileId) => {
  const limit = 8;
  const { pageCount } = filters;
  const skip = (pageCount || 0) * 8;
  const id = new mongoose.Types.ObjectId(profileId);
  return Post.aggregate([
    {
      $match: {
        "author": { $not: { $eq: id } }
      }
    },
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
}

module.exports = getOrchidRss
