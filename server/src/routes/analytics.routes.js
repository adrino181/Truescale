const express = require("express");
const router = express.Router();
const { isbot } = require('isbot');
const ipaddr = require('ipaddr.js');
const { generateAnalyticsToken } = require('../utils/generateAuthToken');
const { findSession } = require('../services/session.service');
const { getJsonBody } = require('../utils/detect');
const { saveEvent } = require('../queries');
const getSessionMetrics = require("../queries/analytics/session/getSessionMetrics");

const getSession = async (req, res, next) => {
  if (isbot(req.headers['user-agent']) && !process.env.DISABLE_BOT_CHECK) {
    next();
  }
  try {
    const session = await findSession(req)
    req.session = session;
    next();
  } catch (error) {
    res.status(403).json({
      message: 'ERROR'
    })
  }
}


router.post('/send', getSession, async (req, res) => {
  const session = req.session;
  const token = await generateAnalyticsToken(session, process.env.JWT_KEY);
  const { type, payload } = getJsonBody(req)
  const { url, referrer, name: eventName, data: eventData, title: pageTitle } = payload;

  try {
    if (eventData && !(typeof eventData === 'object' && !Array.isArray(eventData))) {
      throw new Error('Invalid event data');
    }

    let [urlPath, urlQuery] = url?.split('?') || [];
    let [referrerPath, referrerQuery] = referrer?.split('?') || [];
    let referrerDomain;

    if (!urlPath) {
      urlPath = '/';
    }

    if (referrerPath?.startsWith('http')) {
      const refUrl = new URL(referrer);
      referrerPath = refUrl.pathname;
      referrerQuery = refUrl.search.substring(1);
      referrerDomain = refUrl.hostname.replace(/www\./, '');
    }

    if (process.env.REMOVE_TRAILING_SLASH) {
      urlPath = urlPath.replace(/.+\/$/, '');
    }

    await saveEvent({
      urlPath,
      urlQuery,
      referrerPath,
      referrerQuery,
      referrerDomain,
      pageTitle,
      eventName,
      eventData,
      ...session,
      sessionId: session._id,
    });
    res.status(200).send(token);
  } catch (e) {
    res.status(500).json({
      message: 'error',
      data: 'error'
    })
  }

});

router.post('/getSessionMetrics', async (req, res) => {
  try {
    const { type, payload } = getJsonBody(req)
    const { websiteId } = payload;
    const data = await getSessionMetrics({ websiteId });
    res.status(200).json({
      message: 'SUCCESS',
      data,
    })
  } catch (e) {
    res.status(403).json({
      message: 'error',
      data: e.message,
    })
  }
});

module.exports = router;
