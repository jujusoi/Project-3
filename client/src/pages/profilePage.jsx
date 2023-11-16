import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_PROFILE_BY_ID } from "../utilities/queries";
import LoadingPage from "./loadingPage";
import NormalUserProfile from "../components/userProfile/userProfile";
import OrganisationProfile from "../components/orgProfile/organisaitonProfile";

export default function ProfilePage() {

    const profileId = useParams().profileId;

    const { loading, data, refetch } = useQuery(QUERY_PROFILE_BY_ID, {
        variables: {profileId: profileId}
    });

    console.log(data);

    if (loading) {
        return (
            <LoadingPage />
        );
    } else {
        if (data.profileById.isOrganisation === true) {
            return (
                <OrganisationProfile profileData={data.profileById} />
            );
        } else {
            return (
                <NormalUserProfile profileData={data.profileById} refetch={refetch} />
            );
        }
    }
}