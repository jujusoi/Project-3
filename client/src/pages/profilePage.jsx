import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_PROFILE_BY_ID } from "../utilities/queries";
import LoadingPage from "./loadingPage";

export default function ProfilePage() {

    const profileId = useParams().profileId;

    const { loading, data } = useQuery(QUERY_PROFILE_BY_ID, {
        variables: {profileId: profileId}
    });

    console.log(data);

    if (loading) {
        return (
            <LoadingPage />
        );
    } else {
        return (
            <>
                <h3>{profileId}</h3>
            </>
        );
    }
}