const mongoose = require("mongoose");

const PinnedPost = new mongoose.Schema({
  postId: {
    type: Schema.Types.ObjectId,
    ref: "Post",
  },
  guildId: {
    type: Schema.Types.ObjectId,
    ref: "Guild",
  },
},
  { timestamps: true }
);


module.exports = mongoose.model('PinnedGuildPost', PinnedPost);
