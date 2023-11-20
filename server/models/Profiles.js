const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const profileSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Invalid email address'],
    },
    password: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    orgName: {
        type: String,
    },
    age: {
        type: Number,
    },
    userLocation: {
        type: String,
        required: true,
    },
    experience: {
        type: String,
    },
    biography: {
        type: String,
        required: true,
    },
    industry: {
        type: String,
        required: true,
    },
    profilePicture: {
        type: String,
        default: "https://images.are.na/eyJidWNrZXQiOiJhcmVuYV9pbWFnZXMiLCJrZXkiOiI4MDQwOTc0L29yaWdpbmFsX2ZmNGYxZjQzZDdiNzJjYzMxZDJlYjViMDgyN2ZmMWFjLnBuZyIsImVkaXRzIjp7InJlc2l6ZSI6eyJ3aWR0aCI6MTIwMCwiaGVpZ2h0IjoxMjAwLCJmaXQiOiJpbnNpZGUiLCJ3aXRob3V0RW5sYXJnZW1lbnQiOnRydWV9LCJ3ZWJwIjp7InF1YWxpdHkiOjkwfSwianBlZyI6eyJxdWFsaXR5Ijo5MH0sInJvdGF0ZSI6bnVsbH19?bc=0",
    },
    isOrganisation: {
        type: Boolean,
        required: true,
    },
    savedListings: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Listing',
        },
    ],
    userChats: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Chat',
        },
    ],
});

profileSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }
    next();
});

profileSchema.methods.checkPassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

const Profile = model('Profile', profileSchema);

module.exports = Profile;