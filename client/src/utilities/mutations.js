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

export const CREATE_NEW_CHAT = gql`
mutation Mutation($chatInfo: CreateChat!) {
  createNewChat(chatInfo: $chatInfo) {
    _id
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
`;

export const DELETE_CHAT = gql`
  mutation Mutation($chatId: ID!) {
  deleteChat(chatId: $chatId) {
    chatName
  }
}
`;

export const EDIT_PROFILE = gql`
mutation EditProfile($editInfo: EditProfile!) {
  editProfile(editInfo: $editInfo) {
    token
    profile {
      biography
      industry
      isOrganisation
      userLocation
    }
  }
}
`;