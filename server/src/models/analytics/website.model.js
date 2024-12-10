const mongoose = require("mongoose");

const { Schema } = mongoose;
const crypto = require("crypto");

const website = Schema(
  {
    name: {
      type: String,
      required: true,
      maxLength: 100,
    },
    domain: {
      type: String,
      required: false,
      maxLength: 200,
    },
    profile: {
      type: Schema.Types.ObjectId,
      ref: "Profile",
      required: false,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    shareId: {
      type: String,
      maxLength: 16,
      required: true,
    },
    eventData: [
      {
        type: Schema.Types.ObjectId,
        ref: "EventData",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Website", website);
