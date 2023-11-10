import { gql } from "@apollo/client";

export const QUERY_RANDOM_LISTINGS = gql`
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