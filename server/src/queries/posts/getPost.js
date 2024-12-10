const mongoose = require('mongoose');
const Profile = require('../../models/profile.model');
const Post = require('../../models/post.model');
const { formatISO, subDays } = require('date-fns');

//get a single post with view and data
const getPostData = async (postId, userId) => {
  try {
    const id = new mongoose.Types.ObjectId(postId);
    const uid = new mongoose.Types.ObjectId(userId);
    const dateFilter = formatISO(subDays(new Date(), 5));
    return await Post.aggregate([
      {
        $match: { "_id": id }
      },
      {
        $lookup: {
          from: 'likes',
          let: { id: "$_id", authorId: { $toObjectId: uid } },
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
    ]);
  } catch (e) {
    throw new Error("Error in fetching data");
  }
}

module.exports = getPostData;
