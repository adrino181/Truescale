const mongoose = require("mongoose");

const { Schema } = mongoose;

const coverageSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  fileUrl: {
    type: String,
  },
  media: {
    type: String,
  },
  coverageMedium: {
    type: String,
  },
  coverageArea: {
    type: String,
  },
  coverageDate: {
    type: String,
  },
  coverageMetaData: {
    type: Object,
  }

  // mediaAppeared: [
  //
  // ],
  // authorAppeared: {
  //
  // },
  // mediaCovered: {
  //
  // },
  // authorCovered: {
  //
  // },
  // coverageType: [
  //
  // ],
  // speakers: [
  //
  // ],
},
{ timestamps: true }
);

module.exports = mongoose.model("Coverage", coverageSchema);
