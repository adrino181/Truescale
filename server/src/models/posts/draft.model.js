
const mongoose = require("mongoose");

const { Schema } = mongoose;

const draftSchema = new Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: "Profile",
    },
    blockData: {
      type: Array,
      require: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Draft", draftSchema);
