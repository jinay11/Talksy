const mongoose = require("mongoose");

const chatMessageSchema = new mongoose.Schema({
    user: {type:String, require:true},
    message: {type:String, require:true},
    timestamp:{type:Date,default: Date.now},
});

const chatMessage = mongoose.model('chatMessage',chatMessageSchema);

module.exports = chatMessage;