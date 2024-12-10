const mongoose = require("mongoose");

const { Schema } = mongoose;

const websiteEvent = Schema({
  website: {
    type: Schema.Types.ObjectId,
    ref: "Website",
  },
  session: {
    type: Schema.Types.ObjectId,
    ref: "Session",
  },
  eventData: [{
    type: Schema.Types.ObjectId,
    ref: "EventData",
  }],
  urlPath: {
    type: String,
    required: true,
    maxLength: 500,
  },
  urlQuery: {
    type: String,
    required: false,
    maxLength: 500,
  },
  referrerPath: {
    type: String,
    required: false,
    maxLength: 500,
  },
  referrerQuery: {
    type: String,
    required: false,
    maxLength: 500,
  },
  referrerDomain: {
    type: String,
    required: false,
    maxLength: 500,
  },
  pageTitle: {
    type: String,
    required: false,
    maxLength: 500,
  },
  eventType: {
    type: Number,
    default: 1,
  },
  eventName: {
    type: String,
    required: false,
    maxLength: 50,
  }
},
  {
    timestamps: true,
  });


module.exports = mongoose.model('WebsiteEvent', websiteEvent);
