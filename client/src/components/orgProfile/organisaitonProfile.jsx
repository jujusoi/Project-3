import { useQuery } from "@apollo/client";

import MinilistingComponent from "../listingComps/miniListingComp";
import { QUERY_LISTING_BY_ORGANISATION_FOR_PROF } from "../../utilities/queries";
import LoadingPage from "../../pages/loadingPage";

export default function OrganisationProfile({ profileData }) {

    const orgName = profileData.orgName;
    console.log(orgName);
    let index = 0;

    const { loading, data } = useQuery(QUERY_LISTING_BY_ORGANISATION_FOR_PROF, {
        variables: { orgName },
    });

    console.log(data);

    if (loading) {
        return (
            <h2>Loading</h2>
        );
    } else {
        return (
            <>
                <section id="org-profile-sect" style={{ width: '90%', margin: 'auto'}}>
                    <div id="org-profile-holder" style={{ marginTop: 40 }}>
                        <div id="org-tpi-hold" style={{ display: "flex", alignItems: 'center'}}>
                            <div id="org-pfp"><img width={100} height={100} src={profileData.profilePicture} style={{ borderRadius: 50}}></img></div>
                            <div id="org-title-ind" style={{ textAlign: "left", marginLeft: 28 }}>
                                <h2>{profileData.orgName}</h2>
                                <p>Industry: <b>{profileData.industry}</b></p>
                            </div>
                        </div>
                        <div id="org-lbc-hold" style={{ display: "flex", flexDirection: 'column', textAlign: "left", padding: 35}}>
                            <div id="org-loc" style={{ display: 'flex', alignItems: 'center', marginBottom: 15 }}>
                                <h4 style={{ marginBottom: 0, marginRight: 12}}>Location: </h4>
                                <p style={{ marginBottom: 0}}> {profileData.userLocation}</p>
                            </div>
                            <div id="org-bio">
                                <h4>Biography:</h4>
                                <p>{profileData.biography}</p>
                            </div>
                            <div id="org-contact">
                                <h4>{profileData.orgName[profileData.orgName.length - 1] == 's' ? profileData.orgName + `'` : profileData.orgName + `'s`} Contacts:</h4>
                                <p>Email: {profileData.email}</p>
                            </div>
                        </div>
                        <div id="mini-joblist-hold" style={{ display: "flex", flexDirection: "column"}}>
                            <h3 style={{ textAlign: 'left' }}>Other Job Listings by {profileData.orgName}</h3>
                            <div id="org-minilist-holder" style={{ display: 'flex', overflowX: 'scroll', width: '100%'}}>
                                {data.listingByOrganisationProf.map((listing) => {
                                    index++;
                                    return (
                                        <MinilistingComponent data={listing}/>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </section>
            </>
        );
    }
}