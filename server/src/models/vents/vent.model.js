const mongoose = require("mongoose");

const { Schema } = mongoose;

const ventSchema = new Schema({
  profileId: {
    type: Schema.Types.ObjectId,
    ref: "Profile",
  },
  startTime: {
    type: Schema.Types.Date,
    require: true,
  },
  endTime: {
    type: Schema.Types.Date,
    require: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Vent', ventSchema);

