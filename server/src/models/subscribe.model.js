const mongoose = require("mongoose");

const { Schema } = mongoose;

const susbscribeSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    profile: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Subscribe", susbscribeSchema);
