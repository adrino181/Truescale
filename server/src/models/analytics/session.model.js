const mongoose = require("mongoose");

const { Schema } = mongoose;

const session = new Schema(
  {
    websiteId: {
      type: Schema.Types.ObjectId,
      ref: "Website",
    },
    hashId: {
      type: String,
      required: true,
    },
    hostname: {
      type: String,
      required: false,
      maxLength: 100,
    },
    browser: {
      type: String,
      required: false,
      maxLength: 20,
    },
    os: {
      type: String,
      required: false,
      maxLength: 20,
    },
    device: {
      type: String,
      required: false,
      maxLength: 20,
    },
    screen: {
      type: String,
      required: false,
      maxLength: 11,
    },
    language: {
      type: String,
      required: false,
      maxLength: 35,
    },
    country: {
      type: String,
      required: false,
      maxLength: 2,
    },
    subdivision1: {
      type: String,
      required: false,
      maxLength: 20,
    },
    subdivision2: {
      type: String,
      required: false,
      maxLength: 50,
    },
    city: {
      type: String,
      required: false,
      maxLength: 50,
    },
    websiteEvent: {
      type: Schema.Types.ObjectId,
      ref: "WebsiteEvent",
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Session", session);
