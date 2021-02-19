const mongoose = require('mongoose');

const MessageSchema = mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    phone:{
        type: String
    },
    date: {
        type: Date,
        default:Date.now
    }
});

module.exports = mongoose.model('message',MessageSchema);