import { Link } from "react-router-dom";

export default function MinilistingComponent({ data }) {
    return (
        <>

            <div className="mini-job-listing prof-mini" style={{ display: 'flex', flexDirection: "column", padding: 25, marginTop: 5, border: '1px solid white', borderRadius: 8, minWidth: 450, marginRight: 25, borderLeft: '5px solid #EA312D', boxShadow: 'rgba(0, 0, 0, 0.07) 7px 7px 7px 0px' }}>
                <div className="liinfo-hold" style={{ display: "flex", flexDirection: "column" }}>
                    <div id="mini-date-hold" className="tsd-hold" style={{ display: "flex", justifyContent: 'space-between' }}>
                        <div className="ts-hold" style={{ display: 'flex', width: '65%', flexDirection: 'column' }}>
                            <Link to={`/listing/${data._id}`} target="_blank"><h4 style={{ textAlign: 'left', marginTop: 0, marginBottom: 5 }} className="listing-title linkanchor">{data.title}</h4></Link>
                            <p style={{ textAlign: 'left' }} className="listing-not">{data.salary}</p>
                        </div>
                        <p id="mini-date" className="listing-not" style={{ width: '30%', marginTop: 0, textAlign: "right" }}>{data.postedOn}</p>
                    </div>
                    <div className="ilj-o-hold" style={{ display: "flex", flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', borderTop: '3px solid rgba(0, 0, 0, 0.08)', paddingTop: 20 }}>
                        <div className="liilj-hold" style={{ width: '100%', justifyContent: 'space-between' }}>
                            <div style={{ display: 'flex' }}>
                                <p className="listing-not" style={{ marginRight: 10 }}>Job type: </p>
                                <li className="listing-details">{data.jobType}</li>
                            </div>
                            <div style={{ display: 'flex' }}>
                                <p className="listing-not" style={{ marginRight: 10 }}>Industry: </p>
                                <li className="listing-details">{data.industry}</li>
                            </div>
                            <div style={{ display: 'flex' }}>
                                <p className="listing-not" style={{ marginRight: 10 }}>Location: </p>
                                <li className="listing-details">{data.location}</li>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}