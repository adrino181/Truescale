const { EVENT_DATA_TYPE } = require('../../../utils/constant');
const {flattenJSON} = require('../../../utils/eventData')
const EventData = require('../../../models/analytics/event.model');
async function saveEventData({
  websiteId,
  eventId,
  sessionId,
  urlPath,
  eventName,
  eventData,
  createdAt,
}) {
  return relationalQuery({
    websiteId,
    eventId,
    sessionId,
    urlPath,
    eventName,
    eventData,
    createdAt,
  });
}

async function relationalQuery(data){
  const { websiteId, eventId, eventData, sessionId } = data;

  const jsonKeys = flattenJSON(eventData);

  //id, websiteEventId, eventStringValue
  const flattendData = jsonKeys.map(a => ({
    websiteEventId: eventId,
    website:websiteId,
    eventKey: a.key,
    eventStringValue:
      a.eventDataType === EVENT_DATA_TYPE.string ||
      a.eventDataType === EVENT_DATA_TYPE.boolean ||
      a.eventDataType === EVENT_DATA_TYPE.array
        ? a.value
        : null,
    eventNumericValue: a.eventDataType === EVENT_DATA_TYPE.number ? a.value : null,
    eventDateValue: a.eventDataType === EVENT_DATA_TYPE.date ? new Date(a.value) : null,
    eventDataType: a.eventDataType,
  }));

  return EventData.insetMany(flattendData);
}


module.exports = saveEventData;

