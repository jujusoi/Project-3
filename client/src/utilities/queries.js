import { gql } from "@apollo/client";

export const QUERY_LISTINGS = gql`
    query randomListings {
        listings {
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
        }
    }
`;