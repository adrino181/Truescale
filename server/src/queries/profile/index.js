const getProfileAnalytics = require("./getProfileAnalytics");
const getProfileDetails = require('./profileDetails');
const { getFollowers, getFollowing, updateFollower } = require("./getFollower");
module.exports = { getProfileAnalytics, getProfileDetails, getFollowers, getFollowing, updateFollower }
