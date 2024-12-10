const mongoose = require("mongoose");
const Post = require("../../models/post.model");
const Follower = require("../../models/follower.model");

const followingPost = async (filters, profileId) => {
  const limit = limitCount || 8;
  const skip = (pageCount || 0) * 8;

  return await Follower.aggregate([
    {
      $match: {
        followerId: { $eq: mongoose.Types.ObjectId(profileId) },
      }
    },
    {
      $lookup: {
        from: 'posts',
        let: { id: "$_id", followingId: "$_followingId" },
        pipeline: [
          {
            $match: {
              $and: [
                { $expr: { $eq: ["$author._id", "$$id"] } },
              ]
            }
          }
        ],
        as: 'posts'
      },
    },
    {
      $lookup: {
        from: 'likes',
        let: { id: "$_id", authorId: { $toObjectId: profileId } },
        pipeline: [
          {
            $match: {
              $and: [
                { $expr: { $eq: ["$postId", "$$id"] } },
                { $expr: { $eq: ["$author", "$$authorId"] } },
              ]
            }
          }
        ],
        as: 'isLiked'
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
          { "$sort": { "_id": -1 } },
          { "$limit": 5 }
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
        views: { $size: "$sessions" },
        likesCount: 1,
        postData: 1,
        blockData: 1,
        createdAt: 1,
        trackerId: 1,
        commentsCount: 1,
        shareId: { $first: '$website.shareId' },
        author: { $first: '$author' },
        comments: 1,
        tags: 1,
        isLiked: {
          $cond: {
            if: { $eq: [{ $size: "$isLiked" }, 0] },
            then: false,
            else: true,
          }
        }
      }
    },
    { $sort: { createdAt: -1 } },
    { $skip: skip },
    { $limit: limit },
  ]);

}

const mostRecent = async (filters, profileId) => {
  const { pageCount, limitCount, type } = filters;
  const limit = limitCount || 8;
  const skip = (pageCount || 0) * 8;

  return await Post.aggregate([
    {
      $match: {
        author: { $not: { $eq: mongoose.Types.ObjectId(profileId) } },
      }
    },
    {
      $lookup: {
        from: 'likes',
        let: { id: "$_id", authorId: { $toObjectId: profileId } },
        pipeline: [
          {
            $match: {
              $and: [
                { $expr: { $eq: ["$postId", "$$id"] } },
                { $expr: { $eq: ["$author", "$$authorId"] } },
              ]
            }
          }
        ],
        as: 'isLiked'
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
          { "$sort": { "_id": -1 } },
          { "$limit": 5 }
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
        views: { $size: "$sessions" },
        likesCount: 1,
        postData: 1,
        blockData: 1,
        createdAt: 1,
        trackerId: 1,
        commentsCount: 1,
        shareId: { $first: '$website.shareId' },
        author: { $first: '$author' },
        comments: 1,
        tags: 1,
        isLiked: {
          $cond: {
            if: { $eq: [{ $size: "$isLiked" }, 0] },
            then: false,
            else: true,
          }
        }
      }
    },
    { $sort: { createdAt: -1 } },
    { $skip: skip },
    { $limit: limit },
  ]);
};

/**
 *
 * @param {{
 * pageCount: string,
 * limitCount: string,
 * }} filters
 * @param {*} profileId
 * @returns
 */
const getTrending = async (filters, profileId) => {
  const { pageCount, limitCount, type } = filters;
  const limit = limitCount || 8;
  const skip = (pageCount || 0) * 8;

  return Post.aggregate([
    {
      $match: {
        author: { $not: { $eq: profileId } },
      }
    },
    {
      $lookup: {
        from: 'likes',
        let: { id: "$_id", authorId: { $toObjectId: profileId } },
        pipeline: [
          {
            $match: {
              $and: [
                { $expr: { $eq: ["$postId", "$$id"] } },
                { $expr: { $eq: ["$author", "$$authorId"] } },
              ]
            }
          }
        ],
        as: 'isLiked'
      },
    },
    {
      $lookup: {
        from: 'followers',
        let: { author: "$author", follower: { $toObjectId: profileId } },
        pipeline: [
          {
            $match: {
              $and: [
                { $expr: { $eq: ["$author", "$$author"] } },
                { $expr: { $eq: ["$follower", "$$follower"] } },
              ]
            }
          }
        ],
        as: 'isListening'
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
          { "$sort": { "_id": -1 } },
          { "$limit": 5 }
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
      $addFields: {
        "author.isListening": {
          $cond: {
            if: { $eq: [{ $size: "$isListening" }, 0] },
            then: false,
            else: true,
          }
        }
      }
    },
    {
      $project: {
        views: { $size: "$sessions" },
        likesCount: 1,
        postData: 1,
        blockData: 1,
        createdAt: 1,
        trackerId: 1,
        commentsCount: 1,
        shareId: { $first: '$website.shareId' },
        author: {
          $first: '$author',
        },
        comments: 1,
        tags: 1,
        isLiked: {
          $cond: {
            if: { $eq: [{ $size: "$isLiked" }, 0] },
            then: false,
            else: true,
          }
        }
      }
    },
    { $sort: { createdAt: -1 } },
    { $skip: skip },
    { $limit: limit },
  ]);
};

module.exports = getTrending;
