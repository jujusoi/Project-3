const { Schema, model } = require('mongoose');

const options = { day: '2-digit', month: 'short', year: 'numeric' };

const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    organisationName: {
        type: String,
        required: true,
    },
    industry: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    salary: {
        type: String,
        required: true,
    },
    jobType: {
        type: String,
        required: true,
    },
    jobDescription: {
        type: String,
        required: true,
    },
    postedOn: {
        type: String,
        default: function() {
            return new Date().toLocaleDateString('en-US', options);
        },
    },
    poster: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Profile',
        },
    ],
});

const Listing = model('Listing', listingSchema);

module.exports = Listing;