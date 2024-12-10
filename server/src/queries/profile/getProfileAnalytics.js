const mongoose = require('mongoose');
const Profile = require('../../models/profile.model');
const Post = require('../../models/post.model');
const { formatISO, subDays } = require('date-fns');

const getProfileAnalytics = async (profileId) => {
  try {
    const id = new mongoose.Types.ObjectId(profileId);
    const dateFilter = formatISO(subDays(new Date(), 5));
    return await Post.aggregate([
      {
        $match: { "author": id }
      },
      {
        $facet: {
          total: [
            {
              $lookup: {
                from: 'sessions',
                localField: 'trackerId',
                foreignField: 'websiteId',
                as: 'sessions'
              }
            },
            {
              $project: { totalSession: { $size: "$sessions" }, totalLikes: { $size: "$likes" } }
            },
            {
              $group: {
                _id: 'analytics',
                totalSession: { $sum: "$totalSession" },
                totalLikes: { $sum: "$likes" },
                totalPosts: { $sum: 1 }
              }
            }
          ],
          userTag: [
            { $unwind: "$tags" },
            { $sortByCount: "$tags" },
            { $limit: 5 }
          ],
          postData: [
            {
              $lookup: {
                from: 'sessions',
                localField: 'trackerId',
                foreignField: 'websiteId',
                as: 'sessions'
              }
            },
            { $limit: 5 },
            {
              $project: { totalSession: { $size: "$sessions" }, totalLikes: { $size: "$likes" }, postData: 1, }
            },
            { $sort: { "totalSession": -1 } },
          ],
          sessions: [{
            $lookup: {
              from: 'sessions',
              let: { trackerId: "$trackerId" },
              pipeline: [
                {
                  $match: {
                    $expr: {
                      $and: [
                        { $eq: ['$websiteId', '$$trackerId'] },
                        { $gte: ['$createdAt', dateFilter] },
                      ]
                    }
                  }
                }
              ],
              as: 'sessionData',
            }
          },
          { $project: { sessionData: 1 } },
          {
            $unwind: "$sessionData"
          },
          {
            $group: {
              _id: { $dateToString: { format: "%Y-%m-%d", date: "$sessionData.createdAt" } },
              // list: { $push: "$$ROOT" },
              count: { $sum: 1 }
            }
          }
          ],
        }
      }
    ]);
  } catch (e) {
    throw new Error("Error in fetching data");
  }
}

module.exports = getProfileAnalytics;
