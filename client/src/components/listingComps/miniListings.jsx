import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_LISTING_BY_ORGANISATION } from "../../utilities/queries";

export default function MiniListings({ orgName, index }) {

    const {loading, data} = useQuery(QUERY_LISTING_BY_ORGANISATION, {
        variables: {orgName},
    });

    console.log(data);

    if (loading) {
        return (
            <h3>Loading...</h3>
        );
    } else {
        if (data.listingByOrganisation.length == index + 1 || data.listingByOrganisation.length == index + 2) {
            return (
                <>
                    <div className="job-listing" style={{ display: 'flex', flexDirection: "column", padding: 25, marginTop: 5, border: '1px solid white', borderRadius: 15, backgroundColor: '#e2e2e2', width: '48%'}}>
                                    <div className="liinfo-hold" style={{ display: "flex", flexDirection: "column"}}>
                                        <div className="tsd-hold" style={{ display: "flex", justifyContent: 'space-between'}}>
                                            <div className="ts-hold" style={{ display: 'flex', width: '65%', flexDirection: 'column'}}>
                                                <Link to={`/listing/${data.listingByOrganisation[index]._id}`} target="_blank"><h4 style={{ textAlign: 'left', marginTop: 0, marginBottom: 5}}  className="listing-title">{data.listingByOrganisation[index].title}</h4></Link>
                                                <p style={{ textAlign: 'left' }} className="listing-salary">{data.listingByOrganisation[index].salary}</p>
                                            </div>
                                            <p className="listing-date" style={{ width:'30%', marginTop: 0, textAlign: "right"}}>{data.listingByOrganisation[index].postedOn}</p>
                                        </div>
                                        <div className="ilj-o-hold" style={{ display: "flex", flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center'}}>
                                            <div className="liilj-hold" style={{ width: '100%', justifyContent: 'space-between'}}>
                                                <div style={{ display: 'flex', alignItems: 'center'}}>
                                                    <p style={{ marginRight: 10}}>Job type: </p>
                                                    <h5 className="listing-jobtype">{data.listingByOrganisation[index].jobType}</h5>
                                                </div>
                                                <div style={{ display: 'flex', alignItems: 'center'}}>
                                                    <p style={{ marginRight: 10}}>Industry: </p>
                                                    <h5 className="listing-industry">{data.listingByOrganisation[index].industry}</h5>
                                                </div>
                                                <div style={{ display: 'flex', alignItems: 'center'}}>
                                                    <p style={{ marginRight: 10}}>Location: </p>
                                                    <h5 className="listing-location">{data.listingByOrganisation[index].location}</h5>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                </>
            );
        }
    }
    
}