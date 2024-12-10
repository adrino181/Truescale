const { createSession, loadWebsite, loadSession } = require("../queries");
const { getClientInfo, getJsonBody } = require("../utils/detect");
const { uuid, secret } = require("../utils/crypto");
const { decodeAnalyticsToken } = require("../utils/generateAuthToken");
const { validate } = require("uuid");
const { isValidObjectId } = require("mongoose");
async function findSession(req) {
  const { payload } = getJsonBody(req);

  if (!payload) {
    throw new Error("Invalid payload.");
  }

  // Check if cache token is passed
  const cacheToken = req.headers["x-truescale-cache"];

  if (cacheToken) {
    const result = await decodeAnalyticsToken(cacheToken, process.env.JWT_KEY);

    if (result) {
      return result;
    }
  }

  // Verify payload
  const { website: websiteId, hostname, screen, language } = payload;

  if (!isValidObjectId(websiteId)) {
    throw new Error("Invalid website ID.");
  }
  // Find website
  const website = await loadWebsite(websiteId);

  if (!website) {
    throw new Error(`Website not found: ${websiteId}.`);
  }

  const {
    userAgent,
    browser,
    os,
    ip,
    country,
    subdivision1,
    subdivision2,
    city,
    device,
  } = await getClientInfo(req, payload);
  const sessionId = uuid(websiteId, hostname, ip, userAgent);

  // Find session
  let session = await loadSession(sessionId);

  // Create a session if not found
  if (!session) {
    try {
      session = await createSession({
        hashId: sessionId, // unique session ID for every ip and device
        websiteId,
        hostname,
        browser,
        os,
        device,
        screen,
        language,
        country,
        subdivision1,
        subdivision2,
        city,
      });
    } catch (e) {
      if (!e.message.toLowerCase().includes("unique constraint")) {
        throw e;
      }
    }
  }

  return session;
}

module.exports = { findSession };
