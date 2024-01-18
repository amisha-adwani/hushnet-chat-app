const mongoose = require("mongoose");
const { Schema } = mongoose;
const RoomSchema = new Schema({
  roomId: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
  },
});

module.exports = mongoose.model("room", RoomSchema);
