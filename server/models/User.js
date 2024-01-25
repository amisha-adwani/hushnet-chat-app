const mongoose = require("mongoose");
const { Schema } = mongoose;
const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
  },
  roomsOwned:{
    type: Array,
    default: [],
  }
});

module.exports = mongoose.model("user", UserSchema);
