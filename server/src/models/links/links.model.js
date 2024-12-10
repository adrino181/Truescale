const mongoose = require("mongoose");
const { SOCIAL_SLUG } = require("../../constants/socials");

const { Schema } = mongoose;

const linkSchema = new Schema(
  {
    profile: {
      type: Schema.Types.ObjectId,
      ref: "Profile",
    },
    link: {
      type: String,
      default: '',
      maxLength: 20,
    },
    url: {
      type: String,
      maxLength: 50,
      required: true,
    },
  },
  { timestamps: true }
) 

module.exports = mongoose.model("Link", linkSchema);
