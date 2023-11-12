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
                            <div id="org-pfp"><img width={100} height={100} src="https://encrypted-tbn0.gstatic.com/licensed-image?q=tbn:ANd9GcR8Oytq1aOdKp8GpVdNTLPN2-rl_uq4bft4_TjG9WUzvtT2-WJlQXZFOuzpmklzm2qCE4qUTnjLNe971ys" style={{ borderRadius: 50}}></img></div>
                            <div id="org-title-ind" style={{ textAlign: "left", marginLeft: 28 }}>
                                <h2>{profileData.orgName}</h2>
                                <p>{profileData.industry}</p>
                            </div>
                        </div>
                        <div id="org-lbc-hold" style={{ display: "flex", flexDirection: 'column', textAlign: "left", padding: 35}}>
                            <div id="org-loc">
                                <h4>Location: {profileData.userLocation}</h4>
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