const { Profile } = require('../models');

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
    },
};

module.exports = resolvers;