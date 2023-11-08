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
        }
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
    },
};

module.exports = resolvers;