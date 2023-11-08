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
    },
    isOrganisation: {
        type: Boolean,
        required: true,
    },
});

const Profile = model('Profile', profileSchema);

module.exports = Profile;