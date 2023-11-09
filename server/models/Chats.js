const { Schema, model } = require('mongoose');
const messageSchema = require('./Messages');

const chatSchema = new Schema({
    chatName: {
        type: String,
        required: true,
    },
    employer: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Profile',
        },
    ],
    mainUser: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Profile',
        },
    ],
    listedJob: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Listing'
        },
    ],
    chatMessages: [messageSchema]
});

const Chat = model('Chat', chatSchema);

module.exports = Chat;