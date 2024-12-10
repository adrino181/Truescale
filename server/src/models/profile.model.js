const mongoose = require("mongoose");

const { Schema } = mongoose;
const {
  USER_TYPE,
  CITIZEN,
  IS_NEW,
  PROFILE_STATE,
} = require("../constants/slug");

const profileSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  headLine: {
    type: String,
    default: "",
  },
  firstName: {
    type: String,
    default: "",
  },
  lastName: {
    type: String,
    default: "",
  },
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
  website: String,
  location: {
    type: String,
    default: "The Universe",
  },
  bio: { type: String, default: "" },
  dob: {
    type: Date,
  },
  profileImageUrl: {
    type: String,
    default:
      "https://res.cloudinary.com/dnboldv5r/image/upload/v1632958381/probook/avatar_ism2fu.png",
  },
  backgroundImageUrl: {
    type: String,
    default:
      "https://res.cloudinary.com/dnboldv5r/image/upload/v1632958083/probook/i_Ocean-Quote-Twitter-_20Header_full_ap6zgw.jpg",
  },
  phone: {
    type: Number,
    required: false,
  },
  teamSize: {
    type: String,
    required: false,
  },
  industry: [
    {
      type: String,
    },
  ],
  interest: [
    {
      type: String,
    },
  ],
  isPremium: {
    type: Boolean,
    default: false,
  },
  handle: {
    type: String,
    required: false,
    collation: { locale: "es", strength: 2 },
  },
  views: {
    type: Number,
    default: 0,
  },
  profileType: {
    type: String,
    enum: USER_TYPE,
    default: CITIZEN,
  },
  profileState: {
    type: String,
    enum: PROFILE_STATE,
    default: IS_NEW,
  },
  trackerId: {
    type: Schema.Types.ObjectId,
    ref: "Website",
  },
  social:[
    {
      type: Schema.Types.ObjectId,
      ref: "Social"
    },
  ],
});

module.exports = mongoose.model("Profile", profileSchema);
