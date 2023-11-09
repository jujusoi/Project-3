const { Schema } = require('mongoose');

const messageSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    messageContent: {
        type: String,
        required: true,
    },
    timeSent: {
        type: Date,
        default: Date.now,
        required: true,
    },
});

module.exports = messageSchema;