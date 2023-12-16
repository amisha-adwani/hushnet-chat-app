const mongoose = require('mongoose');
const ChatSchema = new Schema({
    user_name:{
        type: String,
        required: true
    },
   date:{
    type: Date,
    default: Date.now
   }
})

module.exports = mongoose.model('chat',ChatSchema);
