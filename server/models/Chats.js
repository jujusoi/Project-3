const { Schema, model } = require('mongoose');

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
});

const Chat = model('Chat', chatSchema);

module.exports = Chat;