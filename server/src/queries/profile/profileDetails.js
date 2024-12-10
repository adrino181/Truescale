const Followers = require('../../models/follower.model');
const Post = require('../../models/post.model');
const Guild = require('../../models/guild/guild.model');
const Vent = require('../../models/vents/vent.model');
const Participant = require('../../models/vents/participant.model');
const Members = require('../../models/guild/member.model');

const getProfileDetails = async (profileId) => {

  const posts = await Post.find({ author: profileId })
    .populate("author")
    .sort("-createdAt")
    .limit(10);

  const followers = await Followers.find({ author: profileId });
  const following = await Followers.find({ followerId: profileId });
  const members = await Members.find({ profileId: profileId });
  const vents = await Participant.find({ profileId: profileId });
  return { posts, followers, following, members, vents };
}


module.exports = getProfileDetails
