const { Schema } = require('mongoose');

const options = { day: '2-digit', month: 'short' };

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
        type: String,
        default: function() {
            return new Date().toLocaleDateString('en-US', options);
        },
    },
});

module.exports = messageSchema;