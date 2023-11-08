const typeDefs = `
    type Profile {
        _id: ID!,
        email: String!,
        password: String!,
        firstName: String,
        lastName: String,
        orgName: String,
        age: Integer,
        userLocation: String!,
        experience: String,
        biography: String!,
        industry: String!,
        profilePicture: String,
        isOrganisation: Boolean!,
    }

    type Query {
        profiles: [Profile]
    }
`

module.exports = typeDefs;