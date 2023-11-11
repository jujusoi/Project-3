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
`