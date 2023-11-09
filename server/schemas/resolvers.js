const { Profile, Listing } = require('../models');

const resolvers = {
    Query: {
        profiles: async (parent, args) => {
            const data = await Profile.find();
            return data;
        },
        profilesByOrg: async (parent, { isOrganisation }) => {
            const data = await Profile.findOne({
                isOrganisation: isOrganisation
            });
            return data;
        },
        listings: async (parent, args) => {
            const data = Listing.find().populate('poster');
            return data;
        },
        listingsByLocation: async (parent, { listingLocation }) => {
            const data = Listing.find({
                location: listingLocation
            }).populate('poster');
            return data;
        },
    },
    Mutation: {
        createProfile: async (parent, { profileInfo }) => {
            const data = await Profile.create(profileInfo);
            return data;
        },
        createOrg: async (parent, { profileInfo}) => {
            const data = await Profile.create(profileInfo);
            return data;
        },
        createListing: async ( parent, { listingInfo }) => {
            const data = await Listing.create(listingInfo);
            return data.populate('poster');
        },
        deleteListing: async (parent, { listingId }) => {
            const data = await Listing.findOneAndDelete({
                _id: listingId
            });
            return data;
        },
    },
};

module.exports = resolvers;