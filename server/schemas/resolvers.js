const { Profile, Listing, Chat } = require('../models');
const mongoose = require('mongoose');
const Auth = require('../utils/auth');

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
                },
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
        listingById: async (parent, { listingId }) => {
            const data = Listing.findOne({
                _id: listingId
            }).populate('poster');
            return data;
        },
        listingsByLocation: async (parent, { listingLocation }) => {
            const data = await Listing.find({
                location: listingLocation
            }).populate('poster');
            return data;
        },
        listingByOrganisation: async (parent, { orgName }) => {
            const data = await Listing.find({
                organisationName: orgName
            }).limit(2);
            return data;
        },
        listingByOrganisationProf: async (parent, { orgName }) => {
            const data = await Listing.find({
                organisationName: orgName
            });
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
        chatById: async (parent, {chatId}) => {
            const data = await Chat.findOne({
                _id: chatId
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
            const tokenInfo = {
                _id: data._id,
                industry: data.industry,
                isOrganisation: data.isOrganisation,
                userLocation: data.userLocation,
            };
            const token = Auth.signToken(tokenInfo);
            return { token, data };
        },
        editProfile: async (parent, { editInfo }) => {
            const data = await Profile.findOneAndUpdate({
                _id: editInfo._id
            }, { $set: { userLocation: editInfo.userLocation, industry: editInfo.industry, biography: editInfo.biography, experience: editInfo.experience, isOrganisation: editInfo.isOrganisation }}, { new: true });
            if (data) {
                const tokenInfo = {
                    _id: data._id,
                    industry: data.industry,
                    isOrganisation: data.isOrganisation,
                    userLocation: data.userLocation,
                };
                const token = Auth.signToken(tokenInfo);
                return { token, data };
            }
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
            const profile = await Profile.findOne({
                _id: profileId
            });
            if (profile.savedListings.includes(listingId)) {
                const data = await Profile.findOneAndUpdate(
                    { _id: profileId },
                    { $pull: { savedListings: listingId } },
                    { new: true }
                ).populate('savedListings');
                return data;
            } else {
                const data = await Profile.findOneAndUpdate(
                    { _id: profileId },
                    { $addToSet: { savedListings: listingId } },
                    { new: true }
                ).populate('savedListings');
                return data;
            }
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
        deleteChat: async (parent, { chatId }) => {
            const data = await Chat.deleteOne({
                _id: chatId,
            });
            return data;
        },
        createMessage: async (parent, { messageInfo, chatId }) => {
            const data = await Chat.findOneAndUpdate({
                _id: chatId
            }, { $push: { chatMessages: messageInfo } }, { new: true });
            return messageInfo;
        },
        deleteMessage: async (parent, { messageId, chatId }) => {
            const data = await Chat.findOneAndUpdate({
                _id: chatId
        }, { $pull: { chatMessages: { _id: messageId }}}, { new: true });
        return data;
        },
        login: async (parent, { email, password }) => {
            const profile = await Profile.findOne({
                email: email
            }).select('-password');
            const tokenInfo = {
                _id: profile._id,
                industry: profile.industry,
                isOrganisation: profile.isOrganisation,
                userLocation: profile.userLocation,
            };
            if (!profile) {
                return;
            } else {
                const token = Auth.signToken(tokenInfo);
                return { token, tokenInfo };
            }
        }
    },
};

module.exports = resolvers;