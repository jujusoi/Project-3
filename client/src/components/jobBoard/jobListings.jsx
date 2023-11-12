import { Link } from "react-router-dom";

import { QUERY_LISTINGS } from "../../utilities/queries";
import { useQuery } from "@apollo/client";
import LoadingPage from "../../pages/loadingPage";

export default function JobListings() {

    const { loading, data } = useQuery(QUERY_LISTINGS);

    const snipDesc = (description) => {
        let newDesc = description.slice(150);
        newDesc = newDesc + '...'
        return newDesc;
    }

    if (loading) {
        return (
            <LoadingPage />
        );
    } else { return (
        data.listings.map((listing) => {
            return (
                <>
                     <div className="job-listing" style={{ display: 'flex', flexDirection: "column", padding: 40, marginTop: 40, border: '1px solid white', borderRadius: 15, backgroundColor: '#e2e2e2'}}>
                        <div className="liinfo-hold" style={{ display: "flex", flexDirection: "column"}}>
                            <div className="tsd-hold" style={{ display: "flex", justifyContent: 'space-between'}}>
                                <div className="ts-hold" style={{ display: 'flex', width: '65%', flexDirection: 'column'}}>
                                    <Link to={`/listing/${listing._id}`} target="_blank"><h2 style={{ textAlign: 'left', marginTop: 0, marginBottom: 0}} key={listing._id} className="listing-title">{listing.title}</h2></Link>
                                    <h5 style={{ textAlign: 'left' }} className="listing-salary">{listing.salary}</h5>
                                </div>
                                <p className="listing-date" style={{ width:'30%', marginTop: 0, textAlign: "right"}}>{listing.postedOn}</p>
                            </div>
                            <div className="ilj-o-hold" style={{ display: "flex", flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center'}}>
                                <div className="liilj-hold" style={{ display: 'flex', width: '100%', justifyContent: 'space-between'}}>
                                    <div style={{ display: 'flex', alignItems: 'center'}}>
                                        <p style={{ marginRight: 10}}>Job type: </p>
                                        <h4 className="listing-jobtype">{listing.jobType}</h4>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center'}}>
                                        <p style={{ marginRight: 10}}>Industry: </p>
                                        <h4 className="listing-industry">{listing.industry}</h4>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center'}}>
                                        <p style={{ marginRight: 10}}>Location: </p>
                                        <h4 className="listing-location">{listing.location}</h4>
                                    </div>
                                </div>
                                <div className="lio-hold" style={{ display: 'flex', width: '100%', alignItems: 'center'}}>
                                    <p style={{ marginRight: 10}}>Listing by: </p>
                                    <Link to={`/profile/${listing.poster[0]._id}`} target="_blank"><h4 className="listing-org">{listing.organisationName}</h4></Link>
                                </div>
                            </div>
                        </div>
                        <div className="lidesc-hold">
                            <h4 style={{ textAlign: "left"}}>Job Description: </h4>
                            <p className="listing-description">{listing.jobDescription.length <= 150 ? listing.jobDescription : snipDesc(listing.jobDescription)}</p>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'right', marginTop: 15 }}>
                                <button className="interested-btn" style={{ backgroundColor: '#5f5fff', marginRight: 10 }}>Interested</button>
                                <button className="save-listing-btn">Save</button>
                            </div>
                    </div>
                </>
            );
        }
    ))
    }
}