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
`