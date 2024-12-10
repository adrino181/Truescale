
const mongoose = require("mongoose");

const { Schema } = mongoose;


const userSchema = new Schema(
  {
    email: {
      type: String,
      required: false,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: false,
      default: 'user',
      unique: false,
    },
    authDetails: {
      isVerified:{
        type: Boolean,
        default: false,
      }
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
