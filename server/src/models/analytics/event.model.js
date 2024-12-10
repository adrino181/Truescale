const mongoose = require("mongoose");

const { Schema } = mongoose;

const eventScehema = new Schema(
  {
    website: {
        type: Schema.Types.ObjectId,
        ref: "Website",
        required: true,
    },
    websiteEvent:  {
        type: Schema.Types.ObjectId,
        ref: "WebsiteEvent",
    },
    eventKey: {
        type: String,
        requried: true,
        maxLength: 500,
    },
    eventStringValue: {
        type: String,
        requried: false,
        maxLength: 500,
    },
    eventNumericValue: {
        type: Number,
        requried: false,
        maxLength: 500,
    },
    eventDateValue: {
        type: Date,
        required: false,
    },
    eventDataType: {
        type: Number,
        rquired: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("EventData", eventScehema);
