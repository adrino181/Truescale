const Follower = require('../../models/follower.model');

const getFollowers = async (userId) => {
  return await Follower.find({ userId });
}

const getFollowing = async (userId) => {
  return await Follower.find({ author: userId });
}

//toggle the followers based on follow or unfollow
const updateFollower = async (userId, followerId, followStatus)  => {
  try {
    const followers = await Follower.find({ author: userId, follower: followerId });
    if (!followers.length && followStatus) {
      const addFollower = new Follower({ author: userId, follower: followerId });
      addFollower.save();
    }
    if (followers.length && !followStatus) {
      await Follower.findOneAndDelete({ author: userId, followerId: followerId });
    }
  } catch (e){
    throw new Error("error in updating followers");
  }
}

module.exports = { getFollowers, getFollowing, updateFollower }
