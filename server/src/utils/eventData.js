const {isValid, parseISO} = require("date-fns");
const {EVENT_DATA_TYPE} = require('./constant');
function flattenJSON(
  eventData,
  keyValues,
  parentKey = '',
) {
  return Object.keys(eventData).reduce(
    (acc, key) => {
      const value = eventData[key];
      const type = typeof eventData[key];

      // nested object
      if (value && type === 'object' && !Array.isArray(value) && !isValid(value)) {
        flattenJSON(value, acc.keyValues, getKeyName(key, parentKey));
      } else {
        createKey(getKeyName(key, parentKey), value, acc);
      }

      return acc;
    },
    { keyValues, parentKey },
  ).keyValues;
}

function getEventDataType(value) {
  let type = typeof value;

  if ((type === 'string' && isValid(value)) || isValid(parseISO(value))) {
    type = 'date';
  }

  return type;
}

function createKey(key, value, acc) {
  const type = getEventDataType(value);

  let eventDataType = null;

  switch (type) {
    case 'number':
      eventDataType = EVENT_DATA_TYPE.number;
      break;
    case 'string':
      eventDataType = EVENT_DATA_TYPE.string;
      break;
    case 'boolean':
      eventDataType = EVENT_DATA_TYPE.boolean;
      break;
    case 'date':
      eventDataType = EVENT_DATA_TYPE.date;
      break;
    case 'object':
      eventDataType = EVENT_DATA_TYPE.array;
      value = JSON.stringify(value);
      break;
    default:
      eventDataType = EVENT_DATA_TYPE.string;
      break;
  }

  acc.keyValues.push({ key, value, eventDataType });
}

function getKeyName(key, parentKey) {
  if (!parentKey) {
    return key;
  }

  return `${parentKey}.${key}`;
}

module.exports = flattenJSON;