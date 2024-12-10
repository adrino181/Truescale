const mongoose = require("mongoose");
const { POST_MEDIA_TYPE } = require("../constants/slug");
const { Schema } = mongoose;

const postSchema = new Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: "Profile",
    },
    subAuthor: {
      type: Schema.Types.ObjectId,
      ref: "Profile",
    },
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "Like",
      },
    ],
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    isLiked: {
      type: Boolean,
      default: false,
    },
    commentsCount: {
      type: Number,
      default: 0,
    },
    likesCount: {
      type: Number,
      default: 0,
    },
    type: {
      type: Number,
      default: 0,
    },
    blockData: {
      type: Array,
    },
    views: {
      type: Number,
      default: 0,
    },
    tags: [{
      type: String,
    }],
    trackerId: {
      type: Schema.Types.ObjectId,
      ref: "Website",
    },
    postData: {
      title: {
        type: String,
        default: '',
      },
      subheading: {
        type: String,
        default: '',
      },
      image: {
        type: String,
        default: '',
      },
      url: {
        type: String,
        default: ''
      },
      rurl: {
        type: String,
        default: ''
      },
    },
    events: [{
      type: Schema.Types.ObjectId,
      ref: "EventData",
    }],
    media: {
      type: String,
      enum: POST_MEDIA_TYPE,
      default: 'article',
    }
  },

  { timestamps: true },
);

module.exports = mongoose.model("Post", postSchema);
