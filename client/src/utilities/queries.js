import { gql } from "@apollo/client";

export const QUERY_LISTINGS = gql`
    query randomListings($pageNumber: Int) {
        listings(pageNumber: $pageNumber) {
            _id,
            title,
            organisationName,
            industry,
            location,
            salary,
            jobType,
            jobDescription,
            postedOn,
            poster {
                _id,
                orgName,
            }
        }
    }
`;

export const QUERY_LISTING_BY_ID = gql`
    query listingId($listingId: ID!) {
        listingById(listingId: $listingId) {
            _id,
            title,
            organisationName,
            industry,
            location,
            salary,
            jobType,
            jobDescription,
            postedOn,
            poster {
                _id,
                orgName,
                userLocation,
                industry,
                profilePicture,
                biography,
            }
        }
    }
`;

export const QUERY_LISTING_BY_ORGANISATION = gql`
    query listingOrg($orgName: String!) {
        listingByOrganisation(orgName: $orgName) {
            _id,
            title,
            organisationName,
            industry,
            location,
            salary,
            jobType,
            postedOn,
        }
    }
`;

export const QUERY_LISTING_BY_ORGANISATION_FOR_PROF = gql`
    query listingOrgProf($orgName: String!) {
        listingByOrganisationProf(orgName: $orgName) {
            _id,
            title,
            organisationName,
            industry,
            location,
            salary,
            jobType,
            postedOn,
        }
    }
`;

export const QUERY_PROFILE_BY_ID = gql`
    query profileId($profileId: ID!) {
        profileById(profileId: $profileId) {
            _id
            firstName
            lastName
            orgName
            age
            userLocation
            experience
            biography
            industry
            profilePicture
            isOrganisation
            email
            savedListings {
                _id
                title
                organisationName
                industry
                location
                salary
                jobType
                jobDescription
                postedOn
                poster {
                    _id
                    orgName
                }
            }
        }
    }
`;

export const QUERY_PROF_SAVES = gql`
    query profileIdSaves($profileId: ID!) {
        profileById(profileId: $profileId) {
            savedListings {
                _id
            }
        }
    }
`;

export const QUERY_PROF_CHATS = gql`
    query profileIdChats($profileId: ID!) {
        profileById(profileId: $profileId) {
            userChats {
                _id
                chatName
                employer {
                    _id
                    orgName
                    profilePicture
                }
                mainUser {
                    _id
                    firstName
                    lastName
                    profilePicture
                }
                listedJob {
                    _id
                    title
                    jobType
                }
                chatMessages {
                    username
                    messageContent
                    timeSent
                }
            }
        }
    }
`;

export const GET_ORG_DATA_LISTING = gql`
    query orgIdInfo($profileId: ID!) {
        profileById(profileId: $profileId) {
            _id,
            orgName,
            industry,
        }
    }
`;

export const QUERY_CHAT_ID = gql`
    query chatInfoById($chatId: ID!) {
  chatById(chatId: $chatId) {
    _id
    employer {
      orgName
    }
    mainUser {
      industry
      firstName
      lastName
    }
    listedJob {
      title
    }
  }
}
`;

export const QUERY_CHATS_PROF = gql`
query Query($profileId: ID!) {
  chatByProfile(profileId: $profileId) {
    listedJob {
      _id
    }
  }
}
`;