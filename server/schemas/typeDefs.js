const typeDefs = `
    type Profile {
        _id: ID!,
        email: String!,
        password: String!,
        firstName: String,
        lastName: String,
        orgName: String,
        age: Int,
        userLocation: String!,
        experience: String,
        biography: String!,
        industry: String!,
        profilePicture: String,
        isOrganisation: Boolean!,
        savedListings: [Listing],
        userChats: [Chat],
    }

    type Chat {
        _id: ID!,
        chatName: String!,
        employer: [Profile],
        mainUser: [Profile],
        listedJob: [Listing],
        chatMessages: [Message],
    }

    type Message {
        username: String!,
        messageContent: String!,
        timeSent: String,
    }
    
    type Listing {
        _id: ID!,
        title: String!,
        organisationName: String!,
        industry: String!,
        location: String!,
        salary: String!,
        jobType: String!,
        jobDescription: String!,
        postedOn: String,
        poster: [Profile],
    }

    input CreateProfile {
        email: String!,
        password: String!,
        firstName: String,
        lastName: String,
        age: Int,
        userLocation: String!,
        experience: String,
        biography: String!,
        industry: String!,
        profilePicture: String,
        isOrganisation: Boolean!,
    }

    input CreateOrganisation {
        email: String!,
        password: String!,
        orgName: String,
        userLocation: String!,
        biography: String!,
        industry: String!,
        profilePicture: String,
        isOrganisation: Boolean!,
    }

    input CreateListing {
        title: String!,
        organisationName: String!,
        industry: String!,
        location: String!,
        salary: String!,
        jobType: String!,
        jobDescription: String!,
        postedOn: String,
        poster: ID!,
    }

    input CreateChat {
        chatName: String!,
        employer: ID!,
        mainUser: ID!,
        listedJob: ID!,
    }

    input CreateMessage {
        username: String!,
        messageContent: String!,
    }

    type Query {
        profiles: [Profile]
        profilesByOrg(isOrganisation: Boolean!): [Profile]
        profileById(profileId: ID!): Profile
        listings: [Listing]
        listingsByLocation(listingLocation: String!): [Listing]
        chatByEmployer(employerId: ID!): [Chat]
        chatByProfile(profileId: ID!): [Chat]
    }

    type Mutation {
        createProfile(profileInfo: CreateProfile!): Profile
        createOrg(profileInfo: CreateOrganisation!): Profile
        createListing(listingInfo: CreateListing!): Listing
        deleteListing(listingId: ID!): Listing
        updateSavedListing(listingId: ID!, profileId: ID!): Profile
        createNewChat(chatInfo: CreateChat!): Chat
        createMessage(messageInfo: CreateMessage!, chatId: ID!): Message
        deleteMessage(messageId: ID!, chatId: ID!): Message
    }
`

module.exports = typeDefs;