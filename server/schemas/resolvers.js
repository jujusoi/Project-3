const { Profile } = require('../models');

const resolvers = {
    Query: {
        profiles: async (parent, args) => {
            const data = await Profile.find();
            return data;
        },
    },
    Mutation: {
        createUser: async (parent, { userInfo }) => {
            const data = await Profile.create(userInfo);
            return data;
        },
        createOrg: async (parent, { userInfo}) => {
            const data = await Profile.create(userInfo);
            return data;
        },
    },
};

module.exports = resolvers;