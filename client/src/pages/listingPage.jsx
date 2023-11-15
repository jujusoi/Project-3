import { useQuery, useMutation } from "@apollo/client";
import { QUERY_LISTING_BY_ID } from "../utilities/queries";
import { useParams } from "react-router-dom";
import { CREATE_NEW_CHAT } from "../utilities/mutations";



import { Link } from "react-router-dom";

import MiniListings from "../components/listingComps/miniListings";
import LoadingPage from "./loadingPage";
import SaveListingButton from "../components/jobBoard/boardButtons/saveListingButton";
import Auth from '../utilities/auth';
import InterestedButton from "../components/jobBoard/boardButtons/interestedButton";

export default function ListingPage() {

    const listingId = useParams().listingId;

    const profileId = Auth.getProfile().data.userInfo._id;

    const { loading, data } = useQuery(QUERY_LISTING_BY_ID, {
        variables: { listingId: listingId }
    });
    const [createNewChat, { error }] = useMutation(CREATE_NEW_CHAT);

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

    if (loading) {
        <LoadingPage />
    } else {
        console.log(data)
        return (
            <>
            <section style={{ display: 'flex', justifyContent: 'space-evenly'}}>
                <div style={{ width: '60%'}}>
                <div className="job-listing" style={{ display: 'flex', flexDirection: "column", padding: 40, marginTop: 40, border: '1px solid white', borderRadius: 8, backgroundColor: '#e2e2e2', width: '100%'}}>
                            <div className="liinfo-hold" style={{ display: "flex", flexDirection: "column"}}>
                                <div className="tsd-hold" style={{ display: "flex", justifyContent: 'space-between', marginBottom: 15}}>
                                    <div className="ts-hold" style={{ display: 'flex', width: '65%', flexDirection: 'column'}}>
                                        <h2 style={{ textAlign: 'left', marginTop: 0, marginBottom: 0}}  className="listing-title">{data.listingById.title}</h2>
                                        <h5 style={{ textAlign: 'left' }} className="listing-salary">{data.listingById.salary}</h5>
                                    </div>
                                    <p className="listing-date" style={{ width:'30%', marginTop: 0, textAlign: "right"}}>{data.listingById.postedOn}</p>
                                </div>
                                <div className="ilj-o-hold" style={{ display: "flex", flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10}}>
                                    <div className="liilj-hold" style={{ display: 'flex', width: '100%', justifyContent: 'space-between'}}>
                                        <div style={{ display: 'flex', alignItems: 'center'}}>
                                            <p style={{ marginRight: 10}}>Job type: </p>
                                            <h4 className="listing-jobtype">{data.listingById.jobType}</h4>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center'}}>
                                            <p style={{ marginRight: 10}}>Industry: </p>
                                            <h4 className="listing-industry">{data.listingById.industry}</h4>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center'}}>
                                            <p style={{ marginRight: 10}}>Location: </p>
                                            <h4 className="listing-location">{data.listingById.location}</h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="lidesc-hold" style={{ marginBottom: 10 }}>
                                <h4 style={{ textAlign: "left"}}>Job Description: </h4>
                                <p className="listing-description">{data.listingById.jobDescription}</p>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'right' }}>
                                <InterestedButton handleNewChat={handleNewChat} listing={data.listingById} profileId={Auth.getProfile().data.userInfo._id}  />
                                <SaveListingButton listingId={listingId} profileId={profileId} />
                            </div>
                        </div>
                    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', marginTop: 10}}>
                        <h4 style={{ textAlign: 'left'}}>Other listings by Employer:</h4>
                        <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between'}}>
                            <MiniListings orgName={data.listingById.organisationName} index={0} />
                            <MiniListings orgName={data.listingById.organisationName} index={1} />
                        </div>
                    </div>
                </div>
                <div style={{ width: '30%', padding: 30, marginTop: 40, backgroundColor: 'rgb(226, 226, 226)', borderRadius: 8}}>
                    <div style={{ display: 'flex', flexDirection: 'column'}}>
                        <div style={{ marginBottom: 25}}>
                            <h3>About the Employer</h3>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', textAlign: 'left', alignItems: 'center' }}>
                            <div style={{ width: '60%'}}>
                                <Link to={`/profile/${data.listingById.poster[0]._id}`} target="_blank"><h5>{data.listingById.poster[0].orgName}</h5></Link>
                                <p style={{ marginBottom: 0 }}>Industry: <b>{data.listingById.poster[0].industry}</b></p>
                                <p>Location: <b>{data.listingById.poster[0].userLocation}</b></p>
                            </div>
                            <div style={{ width: '30%'}}>
                                <Link to={`/profile/${data.listingById.poster[0]._id}`} target="_blank"><img src={data.listingById.poster[0].profilePicture} alt="pfp" height={75} width={75} style={{ borderRadius: 50, border: '1px solid #686868'}} /></Link>
                            </div>
                        </div>
                        <div style={{ textAlign: 'left', marginTop: 18 }}>
                            <h5>Biography</h5>
                            <p>{data.listingById.poster[0].biography}</p>
                        </div>
                    </div>
                </div>
            </section>
            </>
        );
    }
};