import { Link } from "react-router-dom";

import { QUERY_LISTINGS } from "../../utilities/queries";
import { CREATE_NEW_CHAT } from "../../utilities/mutations";
import { useQuery, useMutation } from "@apollo/client";
import LoadingPage from "../../pages/loadingPage";
import SaveListingButton from "./boardButtons/saveListingButton";

import Auth from '../../utilities/auth';
import InterestedButton from "./boardButtons/interestedButton";

export default function JobListings({ pageNumber, searchValues }) {

    const { loading, data } = useQuery(QUERY_LISTINGS, {
        variables: { pageNumber, title: searchValues.title, location: searchValues.location, jobType: searchValues.jobType, industry: searchValues.industry },
    });
    const [createNewChat, { error }] = useMutation(CREATE_NEW_CHAT);

    let isLoggedIn;
    let profileId;
    if (Auth.getToken()) {
        isLoggedIn = true;
        profileId = Auth.getProfile().data.userInfo._id;
    };

    const handleNewChat = async (event, chatInfo) => {
        event.preventDefault();
        try {
            const { data } = await createNewChat({
                variables: { chatInfo: { ...chatInfo } },
            });
            if (data) {
                document.querySelector('#chat-button').click();
                setTimeout(() => {
                    const listOfAllChats = document.getElementsByClassName('userchat-hold');
                    const mostRecentChat = listOfAllChats[listOfAllChats.length - 1];
                    setTimeout(() => {
                        mostRecentChat.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
                        mostRecentChat.style.backgroundColor = '#94d7ef'
                        setTimeout(() => {
                            mostRecentChat.style.backgroundColor = ''
                        }, 1000);
                    }, 300);
                }, 200);
            }
        } catch (err) {
            console.error(err);
        };
    };

    const snipDesc = (description) => {
        let newDesc = description.slice(0, 300);
        newDesc = newDesc + '...'
        return newDesc;
    }

    if (loading) {
        return (
            <LoadingPage />
        );
    } else {
        data.listings.length < 10 ? document.querySelector('#increase-page').disabled = true : document.querySelector('#increase-page').disabled = false;
        return (
            data.listings.length <= 0 ? ( <h2>No listings found D:</h2>) : (data.listings.map((listing) => {
                return (
                    <>
                        <div className="job-listing" style={{ display: 'flex', flexDirection: "column", padding: 40, marginTop: 40, border: '1px solid white', borderRadius: 8, backgroundColor: '#e2e2e2' }}>
                            <div className="liinfo-hold" style={{ display: "flex", flexDirection: "column" }}>
                                <div className="tsd-hold" style={{ display: "flex", justifyContent: 'space-between' }}>
                                    <div className="ts-hold" style={{ display: 'flex', width: '65%', flexDirection: 'column' }}>
                                        <Link to={`/listing/${listing._id}`} target="_blank"><h2 style={{ textAlign: 'left', marginTop: 0, marginBottom: 0 }} key={listing._id} className="listing-title">{listing.title}</h2></Link>
                                        <h5 style={{ textAlign: 'left' }} className="listing-salary">{listing.salary}</h5>
                                    </div>
                                    <p className="listing-date" style={{ width: '30%', marginTop: 0, textAlign: "right" }}>{listing.postedOn}</p>
                                </div>
                                <div className="ilj-o-hold" style={{ display: "flex", flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div className="liilj-hold" style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <p style={{ marginRight: 10 }}>Job type: </p>
                                            <h4 className="listing-jobtype">{listing.jobType}</h4>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <p style={{ marginRight: 10 }}>Industry: </p>
                                            <h4 className="listing-industry">{listing.industry}</h4>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <p style={{ marginRight: 10 }}>Location: </p>
                                            <h4 className="listing-location">{listing.location}</h4>
                                        </div>
                                    </div>
                                    <div className="lio-hold" style={{ display: 'flex', width: '100%', alignItems: 'center' }}>
                                        <p style={{ marginRight: 10 }}>Listing by: </p>
                                        <Link to={`/profile/${listing.poster[0]._id}`} target="_blank"><h4 className="listing-org">{listing.organisationName}</h4></Link>
                                    </div>
                                </div>
                            </div>
                            <div className="lidesc-hold">
                                <h4 style={{ textAlign: "left" }}>Job Description: </h4>
                                <p className="listing-description">{listing.jobDescription.length <= 150 ? listing.jobDescription : snipDesc(listing.jobDescription)}</p>
                            </div>
                            {isLoggedIn && Auth.getProfile().data.userInfo.isOrganisation == false ? (<div style={{ display: 'flex', justifyContent: 'right', marginTop: 15 }}>
                                <InterestedButton handleNewChat={handleNewChat} listing={listing} profileId={profileId} />
                                <SaveListingButton listingId={listing._id} profileId={profileId} />
                            </div>) : ""}
                        </div>
                    </>
                );
            }
        ))
            )
    }
}