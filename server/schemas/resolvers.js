const { Profile, Listing, Chat } = require('../models');
const mongoose = require('mongoose');

const resolvers = {
    Query: {
        profiles: async (parent, args) => {
            const data = await Profile.find().populate([
                {
                path: 'savedListings',
                populate: {
                    path: 'poster'
                }
            },
            {
                path: 'userChats',
                populate: [
                    {
                        path: 'employer',
                    }, 
                    {
                        path: 'listedJob',
                    },
                    {
                        path: 'mainUser',
                    },
                ],
            },
        ])
            return data;
        },
        profilesByOrg: async (parent, { isOrganisation }) => {
            const data = await Profile.findOne({
                isOrganisation: isOrganisation
            });
            return data;
        },
        profileById: async (parent, { profileId }) => {
            const data = await Profile.findById(profileId).populate([
                {
                path: 'savedListings',
                populate: {
                    path: 'poster'
                }
            },
            {
                path: 'userChats',
                populate: [
                    {
                        path: 'employer',
                    }, 
                    {
                        path: 'listedJob',
                    },
                    {
                        path: 'mainUser',
                    },
                ],
            },
        ]);
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
        chatByEmployer: async (parent, { employerId }) => {
            const data = await Chat.find({
                employer: new mongoose.Types.ObjectId(employerId),
            }).populate([
                {
                    path: 'employer',
                },
                {
                    path: 'listedJob',
                },
                {
                    path: 'mainUser',
                },
            ]);
            return data;
        },
        chatByProfile: async (parent, { profileId }) => {
            const data = await Chat.find({
                mainUser: new mongoose.Types.ObjectId(profileId),
            }).populate([
                {
                    path: 'employer',
                },
                {
                    path: 'listedJob',
                },
                {
                    path: 'mainUser',
                },
            ]);
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
        updateSavedListing: async (parent, { listingId, profileId }) => {
            const data = Profile.findOneAndUpdate({
                _id: profileId
            }, { $push: { savedListings: listingId }}, { new: true });
            return data.populate('savedListings');
        },
        createNewChat: async (parent, { chatInfo }) => {
            const data = await Chat.create(chatInfo);

            const employer = await Profile.findOneAndUpdate({
               _id: chatInfo.employer
            }, { $push: { userChats: data._id }}, { new: true });
            const mainUser = await Profile.findOneAndUpdate({
                _id: chatInfo.mainUser
             }, { $push: { userChats: data._id }}, { new: true });
             if (employer && mainUser) {
                return data.populate([
                    {
                        path: 'employer',
                    },
                    {
                        path: 'listedJob',
                    },
                    {
                        path: 'mainUser',
                    },
                ]);
             };
        },
        createMessage: async (parent, { messageInfo, chatId }) => {
            const data = await Chat.findOneAndUpdate({
                _id: chatId
            }, { $push: { chatMessages: messageInfo } }, { new: true });
            return messageInfo;
        }
    },
};

module.exports = resolvers;