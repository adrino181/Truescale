const mongoose = require('mongoose');

const { Schema } = mongoose;
const productSchema = new Schema({
  primeAdmin: {
    type: Schema.Types.ObjectId,
    ref: "Profile",
  },
  admins: [{
    type: Schema.Types.ObjectId,
    ref: "Profile",
  }],
  headLine: {
    type: String,
    default: ''
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
  topics: [{
    type: String,
  }],
  handle: {
    type: String,
    required: false,
    collation: { locale: "es", strength: 2 }
  },
  views: {
    type: Number,
    default: 0,
  },
  members: [{
    type: Schema.Types.ObjectId,
    ref: "Profile",
  }],
  vents: [{
    type: Schema.Types.ObjectId,
    ref: "Vent",
  }],
  membersCount: {
    type: Number,
    default: 0,
  }
});


module.exports = mongoose.model('Product', productSchema);
