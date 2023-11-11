import { Link } from "react-router-dom";

export default function MiniListings() {
    return (
        <>
                                    <div className="job-listing" style={{ display: 'flex', flexDirection: "column", padding: 40, marginTop: 25, border: '1px solid white', borderRadius: 15, backgroundColor: '#e2e2e2', width: '48%'}}>
                            <div className="liinfo-hold" style={{ display: "flex", flexDirection: "column"}}>
                                <div className="tsd-hold" style={{ display: "flex", justifyContent: 'space-between'}}>
                                    <div className="ts-hold" style={{ display: 'flex', width: '65%', flexDirection: 'column'}}>
                                        <Link to={`/listing/`} target="_blank"><h4 style={{ textAlign: 'left', marginTop: 0, marginBottom: 0}}  className="listing-title">Title</h4></Link>
                                        <h5 style={{ textAlign: 'left' }} className="listing-salary"></h5>
                                    </div>
                                    <p className="listing-date" style={{ width:'30%', marginTop: 0, textAlign: "right"}}>10th Nov, 2023</p>
                                </div>
                                <div className="ilj-o-hold" style={{ display: "flex", flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center'}}>
                                    <div className="liilj-hold" style={{ display: 'flex', width: '100%', justifyContent: 'space-between'}}>
                                        <div style={{ display: 'flex', alignItems: 'center'}}>
                                            <p style={{ marginRight: 10}}>Job type: </p>
                                            <h4 className="listing-jobtype"></h4>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center'}}>
                                            <p style={{ marginRight: 10}}>Industry: </p>
                                            <h4 className="listing-industry"></h4>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center'}}>
                                            <p style={{ marginRight: 10}}>Location: </p>
                                            <h4 className="listing-location"></h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
        </>
    );
}