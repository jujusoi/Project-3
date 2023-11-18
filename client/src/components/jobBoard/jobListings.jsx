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
        let newDesc = description.slice(0, 200);
        newDesc = newDesc + '...'
        return newDesc;
    }

    if (loading) {
        return (
            <LoadingPage />
        );
    } else {
        console.log(data);
        data.listings.length < 10 ? document.querySelector('#increase-page').disabled = true : document.querySelector('#increase-page').disabled = false;
        return (
            data.listings.length <= 0 ? (<div><h2>No listings found</h2><p>It seems there are no open job listings that match your filters!</p></div>) : (data.listings.map((listing) => {
                return (
                    <>
                        <div className="job-listing" style={{ display: 'flex', flexDirection: "column", padding: 40, marginTop: 40, border: '1px solid white', borderRadius: 8, backgroundColor: 'white', boxShadow: '5px 5px 12px 0px rgba(0, 0, 0, 0.15)' }}>
                            <div className="liinfo-hold" style={{ display: "flex", flexDirection: "column" }}>
                                <div className="tsd-hold" style={{ display: "flex", justifyContent: 'space-between', marginBottom: 20 }}>
                                    <div className="ts-hold" style={{ display: 'flex', width: '65%', flexDirection: 'column' }}>
                                        <Link to={`/listing/${listing._id}`} target="_blank"><h2 style={{ textAlign: 'left', marginTop: 0, marginBottom: 0 }} key={listing._id} className="listing-title linkanchor">{listing.title}</h2></Link>
                                    </div>
                                    <p className="listing-date" style={{ width: '30%', marginTop: 0, textAlign: "right" }}>{listing.postedOn}</p>
                                </div>
                                <div className="ilj-o-hold" style={{ display: "flex", flexDirection: 'row-reverse', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, borderTop: '1px solid black', paddingTop: 20 }}>
                                    <div className="liilj-hold" style={{ display: 'flex', width: '55%', justifyContent: 'space-between', textAlign: 'left' }}>
                                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                                            <p style={{ marginRight: 10 }}>Employment: </p>
                                            <h5 className="listing-jobtype">{listing.jobType}</h5>
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                                            <p style={{ marginRight: 10 }}>Industry: </p>
                                            <h5 className="listing-industry">{listing.industry}</h5>
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                                            <p style={{ marginRight: 10 }}>Location: </p>
                                            <h5 className="listing-location">{listing.location}</h5>
                                        </div>
                                    </div>
                                    <div className="lio-hold" style={{ display: 'flex', width: '40%', flexDirection: 'column' }}>
                                        <div style={{ display: 'flex' }}>
                                            <p style={{ marginRight: 10 }}>By: </p>
                                            <Link to={`/profile/${listing.poster[0]._id}`} target="_blank"><h5 className="listing-org linkanchor">{listing.organisationName}</h5></Link>
                                        </div>
                                        <div style={{ display: 'flex' }}>
                                            <p style={{ marginRight: 10 }}>Salary: </p>
                                            <h5 style={{ textAlign: 'left' }} className="listing-salary">{listing.salary}</h5>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className="lidesc-hold" style={{ display: 'flex', borderTop: '1px solid black', paddingTop: 20 }}>
                                <div style={{ width: '70%'}}>
                                    <h4 style={{ textAlign: "left" }}>Job Description: </h4>
                                    <p className="listing-description">{listing.jobDescription.length <= 100 ? listing.jobDescription : snipDesc(listing.jobDescription)}</p>
                                </div>
                                {isLoggedIn && Auth.getProfile().data.userInfo.isOrganisation == false ? (<div style={{ display: 'flex', justifyContent: 'right', marginTop: 15, width: '30%', height: 60, margin: 'auto' }}>
                                    <InterestedButton handleNewChat={handleNewChat} listing={listing} profileId={profileId} />
                                    <SaveListingButton listingId={listing._id} profileId={profileId} />
                                </div>) : ""}
                            </div>
                        </div>
                    </>
                );
            }
            ))
        )
    }
}