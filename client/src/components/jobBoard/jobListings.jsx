import { Link } from "react-router-dom";
import { useState } from "react";

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
    const [isMouseOver, setIsMouseOver] = useState('id');

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
        data.listings.length < 10 ? (document.querySelector('#increase-page').disabled = true, document.querySelector('#increase-page').style.opacity = 0, document.querySelector('#increase-page').style.cursor = 'default') : (document.querySelector('#increase-page').disabled = false, document.querySelector('#increase-page').style.opacity = 1, document.querySelector('#increase-page').style.cursor = 'pointer');
        return (
            data.listings.length <= 0 ? (<div><h2>No listings found</h2><p>It seems there are no open job listings that match your filters!</p></div>) : (data.listings.map((listing) => {
                return (
                    <>
                        <div className="job-listing" style={{ display: 'flex', flexDirection: "column", padding: 40, marginTop: 40, border: '1px solid white', borderRadius: 8, backgroundColor: 'white', boxShadow: isMouseOver == listing._id ? '5px 5px 12px 0px rgba(0, 0, 0, 0.4)' : '5px 5px 12px 0px rgba(0, 0, 0, 0.15)', borderLeft: isMouseOver == listing._id ? '5px solid rgb(88, 117, 204)' : '5px solid #032075', transition: '200ms ease-in-out' }} onMouseEnter={() => setIsMouseOver(listing._id)} onMouseLeave={() => setIsMouseOver('')}>
                            <div className="liinfo-hold" style={{ display: "flex", flexDirection: "column" }}>
                                <div className="tsd-hold" style={{ display: "flex", justifyContent: 'space-between', marginBottom: 20 }}>
                                    <div className="ts-hold" style={{ display: 'flex', width: '65%', flexDirection: 'column' }}>
                                        <Link to={`/listing/${listing._id}`} target="_blank"><h2 style={{ textAlign: 'left', marginTop: 0, marginBottom: 0 }} key={listing._id} className="listing-title linkanchor">{listing.title}</h2></Link>
                                    </div>
                                    <p className="listing-not" style={{ width: '30%', marginTop: 0, textAlign: "right" }}>{listing.postedOn}</p>
                                </div>
                                <div className="ilj-o-hold" style={{ display: "flex", flexDirection: 'row-reverse', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, borderTop: '3px solid #00000014', paddingTop: 20 }}>
                                    <div className="liilj-hold" style={{ display: 'flex', width: '55%', justifyContent: 'space-between', textAlign: 'left' }}>
                                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                                            <p className="listing-not" style={{ marginRight: 10 }}>Employment: </p>
                                            <li className="listing-details">{listing.jobType}</li>
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                                            <p className="listing-not" style={{ marginRight: 10 }}>Industry: </p>
                                            <li className="listing-details">{listing.industry}</li>
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                                            <p className="listing-not" style={{ marginRight: 10 }}>Location: </p>
                                            <li className="listing-details">{listing.location}</li>
                                        </div>
                                    </div>
                                    <div className="lio-hold" style={{ display: 'flex', width: '40%', flexDirection: 'column' }}>
                                        <div style={{ display: 'flex' }}>
                                            <p className="listing-not" style={{ marginRight: 10 }}>By: </p>
                                            <Link to={`/profile/${listing.poster[0]._id}`} target="_blank"><h5 className="listing-org linkanchor">{listing.organisationName}</h5></Link>
                                        </div>
                                        <div style={{ display: 'flex' }}>
                                            <p className="listing-not" style={{ marginRight: 10 }}>Salary: </p>
                                            <p style={{ textAlign: 'left' }} className="listing-details">{listing.salary}</p>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className="lidesc-hold" style={{ display: 'flex', borderTop: '3px solid #00000014', paddingTop: 20 }}>
                                <div id="listing-para-div" style={{ width: '70%'}}>
                                    <h4 style={{ textAlign: "left" }}>Job Description: </h4>
                                    <p className="listing-description">{listing.jobDescription.length <= 100 ? listing.jobDescription : snipDesc(listing.jobDescription)}</p>
                                </div>
                                {isLoggedIn && Auth.getProfile().data.userInfo.isOrganisation == false ? (<div id="listing-buttons-div" style={{ display: 'flex', justifyContent: 'right', marginTop: 15, width: '30%', height: 60, margin: 'auto' }}>
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