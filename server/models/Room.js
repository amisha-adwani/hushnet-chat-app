const mongoose = require("mongoose");
const { Schema } = mongoose;
const RoomSchema = new Schema({
  roomId: {
    type: String,
    required: true,
  },
  members: {
    type: [{
      memberId: { type: String, required: true },
      memberName: { type: String, required: true }
    }], }
});

module.exports = mongoose.model("room", RoomSchema);
