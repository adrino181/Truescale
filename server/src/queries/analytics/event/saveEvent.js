const WebsiteEvent = require('../../../models/analytics/websiteEvent.model');
const saveEventData = require('../eventData/saveEventData');
const {URL_LENGTH, EVENT_TYPE, EVENT_NAME_LENGTH} = require('../../../utils/constant');
/**
 * 
 * @param {Object} params full track data
 * @param {string} params.sessionId session Id
 * @param {string} params.websiteId website Id
 * @param {string} params.urlPath url Path
 * @param {string} params.urlQuery url query
 * @param {string} params.referrerPath referred from 
 * @param {string} params.referrerQuery query of referred
 * @param {string} params.referrerDomain domain referred
 * @param {string} params.pageTitle title of page
 * @param {string} params.eventName name of event
 * @param {any} params.eventData event meta data
 * @param {string} params.hostname hostname
 * @param {string} params.browser browser name
 * @param {string} params.os os of user
 * @param {string} params.device device device type
 * @param {string} params.screen screen sizes
 * @param {string} params.language language of access
 * @param {string} params.country country
 * @param {string} params.subdivision1 subdivision first
 * @param {string} params.subdivision2 subdivision second
 * @param {string} params.city city of user
 */

async function saveEvent (params) {
    return queryFunc(params)
}

async function queryFunc( data) {
    const {
        websiteId,
        sessionId,
        urlPath,
        urlQuery,
        referrerPath,
        referrerQuery,
        referrerDomain,
        eventName,
        eventData,
        pageTitle,
    } = data;

  let websiteEvent = new WebsiteEvent({
      website:websiteId,
      session:sessionId,
      urlPath: urlPath?.substring(0, URL_LENGTH),
      urlQuery: urlQuery?.substring(0, URL_LENGTH),
      referrerPath: referrerPath?.substring(0, URL_LENGTH),
      referrerQuery: referrerQuery?.substring(0, URL_LENGTH),
      referrerDomain: referrerDomain?.substring(0, URL_LENGTH),
      pageTitle,
      eventType: eventName ? EVENT_TYPE.customEvent : EVENT_TYPE.pageView,
      eventName: eventName ? eventName?.substring(0, EVENT_NAME_LENGTH) : null,
  })
  await websiteEvent.save();
  if (eventData) {
    await saveEventData({
      websiteId,
      sessionId,
      eventId: websiteEvent.id,
      urlPath: urlPath?.substring(0, URL_LENGTH),
      eventName: eventName?.substring(0, EVENT_NAME_LENGTH),
      eventData,
    });
  }

  return websiteEvent;
}

module.exports = saveEvent;