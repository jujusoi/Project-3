import { Link } from "react-router-dom";

export default function MinilistingComponent({ data }) {
    return (
        <>
            <div className="job-listing" style={{ display: 'flex', flexDirection: "column", padding: 25, marginTop: 5, border: '1px solid white', borderRadius: 8, backgroundColor: '#e2e2e2', width: 300, marginRight: 35 }}>
                <div className="liinfo-hold" style={{ display: "flex", flexDirection: "column" }}>
                    <div className="tsd-hold" style={{ display: "flex", justifyContent: 'space-between' }}>
                        <div className="ts-hold" style={{ display: 'flex', width: '65%', flexDirection: 'column' }}>
                            <Link to={`/listing/${data._id}`} target="_blank"><h4 style={{ textAlign: 'left', marginTop: 0, marginBottom: 5 }} className="listing-title">{data.title}</h4></Link>
                            <p style={{ textAlign: 'left' }} className="listing-salary">{data.salary}</p>
                        </div>
                        <p className="listing-date" style={{ width: '30%', marginTop: 0, textAlign: "right" }}>{data.postedOn}</p>
                    </div>
                    <div className="ilj-o-hold" style={{ display: "flex", flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div className="liilj-hold" style={{ width: '100%', justifyContent: 'space-between' }}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <p style={{ marginRight: 10 }}>Job type: </p>
                                <h5 className="listing-jobtype">{data.jobType}</h5>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <p style={{ marginRight: 10 }}>Industry: </p>
                                <h5 className="listing-industry">{data.industry}</h5>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <p style={{ marginRight: 10 }}>Location: </p>
                                <h5 className="listing-location">{data.location}</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}