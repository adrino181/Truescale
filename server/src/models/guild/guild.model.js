const mongoose = require("mongoose");
const { Schema } = mongoose;
// const {
//   USER_TYPE,
//   CITIZEN,
//   IS_NEW,
//   PROFILE_STATE,
// } = require("../constants/slug");

const guildSchema = new Schema({
  primeAdmin: {
    type: Schema.Types.ObjectId,
    ref: "Profile",
  },
  admins: [
    {
      type: Schema.Types.ObjectId,
      ref: "Profile",
    },
  ],
  headLine: {
    type: String,
    default: "",
  },
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
  vents: [
    {
      type: Schema.Types.ObjectId,
      ref: "Vent",
    },
  ],
  website: String,
  location: {
    type: String,
    default: "The Universe",
  },
  bio: { type: String, default: "" },
  imageUrl: {
    type: String,
    default:
      "https://res.cloudinary.com/dnboldv5r/image/upload/v1632958381/probook/avatar_ism2fu.png",
  },
  backgroundUrl: {
    type: String,
    default:
      "https://res.cloudinary.com/dnboldv5r/image/upload/v1632958083/probook/i_Ocean-Quote-Twitter-_20Header_full_ap6zgw.jpg",
  },
  topics: [
    {
      type: String,
    },
  ],
  handle: {
    type: String,
    required: false,
    collation: { locale: "es", strength: 2 },
  },
  views: {
    type: Number,
    default: 0,
  },
},
  { timestamps: true }
);

module.exports = mongoose.model("Guild", guildSchema);
