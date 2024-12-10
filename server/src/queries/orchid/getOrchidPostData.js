const mongoose = require("mongoose");
const Profile = require("../../models/profile.model");
const Post = require("../../models/post.model");
const { formatISO, subDays } = require("date-fns");

//get a single post with view and data
const getOrchidPost = async (postId, userId) => {
  try {
    const id = new mongoose.Types.ObjectId(postId);
    const dateFilter = formatISO(subDays(new Date(), 5));
    return await Post.aggregate([
      {
        $match: { _id: id },
      },
      {
        $facet: {
          post: [
            {
              $lookup: {
                from: "websites",
                localField: "trackerId",
                foreignField: "_id",
                as: "website",
              },
            },
            {
              $lookup: {
                from: "sessions",
                localField: "trackerId",
                foreignField: "websiteId",
                as: "sessions",
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
                views: { $size: "$sessions" },
                likesCount: { $size: "$likes" },
                postData: 1,
                blockData: 1,
                createdAt: 1,
                trackerId: 1,
                commentsCount: { $size: "$comments" },
                shareId: { $first: "$website.shareId" },
                author: { $first: "$author" },
                tags: 1,
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
          ],
          stats: [
            {
              $lookup: {
                from: "likes",
                let: { id: "$_id", authorId: { $toObjectId: userId } },
                pipeline: [
                  {
                    $match: {
                      $and: [
                        { $expr: { $eq: ["$postId", "$$id"] } },
                        { $expr: { $eq: ["$author", "$$authorId"] } },
                      ],
                    },
                  },
                ],
                as: "isLiked",
              },
            },
            {
              $project: { isLiked: 1 },
            },
          ],
        },
      },
      {
        $project: { post: { $first: "$post" }, stats: { $first: "$stats" } },
      },
    ]);
  } catch (e) {
    throw new Error("Error in fetching data");
  }
};

module.exports = getOrchidPost;
