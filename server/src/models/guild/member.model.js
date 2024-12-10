const mongoose = require("mongoose");
const { Schema } = mongoose;

const memberSchema = new Schema({
  profileId: {
    type: Schema.Types.ObjectId,
    ref: "Profile",
  },
  guildId: {
    type: Schema.Types.ObjectId,
    ref: "Guild",
  },
}, { timestamps: true });


module.exports = mongoose.model('GuildMember', memberSchema);
