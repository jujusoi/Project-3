const db = require('../config/connection');
const { Profile, Chat, Listing } = require('../models');
const clearDb = require('./clearDB');
const profileInfo = require('./orgProfileInfo.json');
const listingInfo = require('./listingInfo.json');

db.once('open', async () => {
    try {
        await clearDb('Listing', 'listings');
        await clearDb('Profile', 'profiles');
        await clearDb('Chat', 'chats');

        await Profile.create(profileInfo);

        await Listing.create(listingInfo);

    } catch (err) {
        console.error(err);
        process.exit(1);
    };
    console.log('Seeded');
    process.exit(0);
});