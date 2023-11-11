import { useQuery } from "@apollo/client";
import { QUERY_LISTING_BY_ID } from "../utilities/queries";
import { useParams } from "react-router-dom";

import { Link } from "react-router-dom";

import MiniListings from "../components/listingComps/miniListings";

export default function ListingPage() {

    const listingId = useParams().listingId;

    const { loading, data } = useQuery(QUERY_LISTING_BY_ID, {
        variables: { listingId: listingId }
    });

    console.log(data);

    if (loading) {
        <h2>Loading...</h2>
    } else {
        return (
            <>
            <section style={{ display: 'flex', justifyContent: 'space-evenly'}}>
                <div style={{ width: '60%'}}>
                <div className="job-listing" style={{ display: 'flex', flexDirection: "column", padding: 40, marginTop: 40, border: '1px solid white', borderRadius: 15, backgroundColor: '#e2e2e2', width: '100%'}}>
                            <div className="liinfo-hold" style={{ display: "flex", flexDirection: "column"}}>
                                <div className="tsd-hold" style={{ display: "flex", justifyContent: 'space-between', marginBottom: 15}}>
                                    <div className="ts-hold" style={{ display: 'flex', width: '65%', flexDirection: 'column'}}>
                                        <h2 style={{ textAlign: 'left', marginTop: 0, marginBottom: 0}}  className="listing-title">{data.listingById.title}</h2>
                                        <h5 style={{ textAlign: 'left' }} className="listing-salary"></h5>
                                    </div>
                                    <p className="listing-date" style={{ width:'30%', marginTop: 0, textAlign: "right"}}>10th Nov, 2023</p>
                                </div>
                                <div className="ilj-o-hold" style={{ display: "flex", flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center'}}>
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
                            <div className="lidesc-hold">
                                <h4 style={{ textAlign: "left"}}>Job Description: </h4>
                                <p className="listing-description">{data.listingById.jobDescription}</p>
                            </div>
                        </div>
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between'}}>
                        <MiniListings />
                        <MiniListings />
                    </div>
                </div>
                <div style={{ width: '30%', padding: 30, marginTop: 40, backgroundColor: 'rgb(226, 226, 226)', borderRadius: 15}}>
                    <div style={{ display: 'flex', flexDirection: 'column'}}>
                        <div style={{ marginBottom: 25}}>
                            <h3>About the Employer</h3>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', textAlign: 'left', alignItems: 'center' }}>
                            <div style={{ width: '60%'}}>
                                <h5>{data.listingById.poster[0].orgName}</h5>
                                <p style={{ marginBottom: 0 }}>Industry: <b>{data.listingById.poster[0].industry}</b></p>
                                <p>Location: <b>{data.listingById.poster[0].userLocation}</b></p>
                            </div>
                            <div style={{ width: '30%'}}>
                                <Link to={`/profile/${data.listingById.poster[0]._id}`} target="_blank"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSY6Ik6pd33eKYLdBjwxc8rB6SxLZvunCsP4BCcfM_rHQ&s" alt="pfp" width={85} style={{ borderRadius: 50, border: '1px solid #686868'}} /></Link>
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