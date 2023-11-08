const { Profile } = require('../models');

const resolvers = {
    Query: {
        profiles: async (parent, args) => {
            const data = await Profile.find();
            return data;
        },
    },
};

module.exports = resolvers;