
const mongoose = require("mongoose");
const Post = require("../../models/post.model");


const postWithCount = async () => {
  return await Post.aggregate([
    {
      $lookup: {
        from: 'likes',
        let: { id: "$_id" },
        pipeline: [
          {
            $match: {
              $and: [
                { $expr: { $eq: ["$postId", "$$id"] } },
              ]
            }
          }
        ],
        as: 'likes'
      },
    },
    {
      $lookup: {
        from: 'comments',
        let: { id: "$_id" },
        pipeline: [
          {
            $match: {
              $and: [
                { $expr: { $eq: ["$postId", "$$id"] } },
              ]
            }
          },
        ],
        as: 'comments'
      },
    },
    {
      $lookup: {
        from: 'websites',
        localField: 'trackerId',
        foreignField: '_id',
        as: 'website'
      }
    },
    {
      $lookup: {
        from: 'sessions',
        localField: 'trackerId',
        foreignField: 'websiteId',
        as: 'sessions'
      }
    },
    {
      $lookup: {
        from: 'profiles',
        localField: 'author',
        foreignField: '_id',
        as: 'author'
      }
    },
    {
      $project: {
        viewsCount: { $size: "$sessions" },
        likesCount: { $size: "$likes" },
        commentsCount: { $size: "$comments" },
        // postData: 0,
        // blockData: 0,
        // createdAt: 0,
        // trackerId: 0,
        // shareId: 0,
        // author: 0,
        // comments: 0,
        // tags: 0,
      }
    },
  ]);
};

module.exports = postWithCount;
