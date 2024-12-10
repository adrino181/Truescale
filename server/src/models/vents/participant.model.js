const mongoose = require("mongoose");
const {Schema} = mongoose;
const participantSchema = new Schema({
  profileId: {
    type: Schema.Types.ObjectId,
    ref: "Profile",
  },
  eventId: {
    type: Schema.Types.ObjectId,
    ref: "Vent",
  },
}, { timestamps: true });


module.exports = mongoose.model('EventParticipant', participantSchema);
