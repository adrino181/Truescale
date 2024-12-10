const mongoose = require("mongoose");

const { Schema } = mongoose;

const followerSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: "Profile",
  },
  follower: {
    type: Schema.Types.ObjectId,
    ref: "Profile",
  },

});

module.exports = mongoose.model("Follower", followerSchema);
