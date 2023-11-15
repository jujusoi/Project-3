import { gql } from "@apollo/client";

export const LOGIN = gql`
    mutation loginUser($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token,
            profile {
                _id,
                userLocation,
                industry,
            }
        }
    }
`;

export const CREATE_PROFILE = gql`
    mutation createNewProfile($profileInfo: CreateProfile!) {
        createProfile(profileInfo: $profileInfo) {
            token,
            profile {
                firstName,
                lastName,
                age,
                userLocation,
                experience,
                biography,
            }
        }
    }
`;

export const SAVE_LISTING = gql`
    mutation SaveListingToProfile($listingId: ID!, $profileId: ID!) {
        updateSavedListing(listingId: $listingId, profileId: $profileId) {
            _id
        }
    }
`;

export const CREATE_MESSAGE = gql`
    mutation Mutation($chatId: ID!, $messageInfo: CreateMessage!) {
      createMessage(chatId: $chatId, messageInfo: $messageInfo) {
        messageContent
        username
      }
    }
`;