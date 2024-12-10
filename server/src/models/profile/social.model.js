const mongoose = require("mongoose");
const { SOCIAL_SLUG } = require("../../constants/socials");

const { Schema } = mongoose;

const socialSchema = new Schema(
  {
    profile: {
      type: Schema.Types.ObjectId,
      ref: "Profile",
    },
    links: [{
      type: Schema.Types.ObjectId,
      ref: "Link",
    }]
  },
  { timestamps: true }
)

module.exports = mongoose.model("Social", socialSchema);
