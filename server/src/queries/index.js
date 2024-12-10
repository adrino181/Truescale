const createSession = require("./analytics/session/createSession");
const loadSession = require("./analytics/session/loadSession");
const loadWebsite = require("./analytics/website/loadWebsite");
const saveEvent = require("./analytics/event/saveEvent");
const createWebsite = require("./analytics/website/createWebsite");

const getPostData = require("./posts/getPost");
const getTrendingPosts = require("./posts/getTrendingPosts");

module.exports = {
  createSession,
  loadSession,
  loadWebsite,
  saveEvent,
  createWebsite,
  getPostData,
  getTrendingPosts,
  ...require("./orchid"),
  ...require("./scripts"),
  ...require("./profile"),
};
