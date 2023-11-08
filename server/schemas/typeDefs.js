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
    }

    input CreateUser {
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

    type Query {
        profiles: [Profile]
    }

    type Mutation {
        createUser(userInfo: CreateUser!): User
        createOrg(userInfo: CreateOrganisation!): User
    }
`

module.exports = typeDefs;