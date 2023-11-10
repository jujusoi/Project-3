import { Link } from "react-router-dom";

export default function JobBoardPage() {
    return (
        <>
            <section id="listing-sect">
                <div id="listing-holder" style={{ width: '55%', margin: 'auto'}}>
                    <div className="job-listing" style={{ display: 'flex', flexDirection: "column", padding: 20}}>
                        <div className="liinfo-hold" style={{ display: "flex", flexDirection: "column"}}>
                            <div className="tsd-hold" style={{ display: "flex", justifyContent: 'space-between'}}>
                                <div className="ts-hold" style={{ display: 'flex', width: '65%', flexDirection: 'column'}}>
                                    <h2 style={{ textAlign: 'left', marginTop: 0, marginBottom: 0}} className="listing-title">Full time junior farmer</h2>
                                    <h5 style={{ textAlign: 'left' }} className="listing-salary">$50,000 - $70,000 AUD P/A</h5>
                                </div>
                                <p className="listing-date" style={{ width:'30%', marginTop: 0}}>10th Nov, 2023</p>
                            </div>
                            <div className="ilj-o-hold" style={{ display: "flex", flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center'}}>
                                <div className="liilj-hold" style={{ display: 'flex', width: '100%', justifyContent: 'space-between'}}>
                                    <div style={{ display: 'flex', alignItems: 'center'}}>
                                        <p style={{ marginRight: 10}}>Job type: </p>
                                        <h4 className="listing-jobtype">Full time</h4>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center'}}>
                                        <p style={{ marginRight: 10}}>Industry: </p>
                                        <h4 className="listing-industry">Farming</h4>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center'}}>
                                        <p style={{ marginRight: 10}}>Location: </p>
                                        <h4 className="listing-location">Sydney</h4>
                                    </div>
                                </div>
                                <div className="lio-hold" style={{ display: 'flex', width: '100%', alignItems: 'center'}}>
                                    <p style={{ marginRight: 10}}>Listing by: </p>
                                    <Link to={`/profile/uikhjkdh2uijkd`}><h4 className="listing-org">Small Growth Farms</h4></Link>
                                </div>
                            </div>
                        </div>
                        <div className="lidesc-hold">
                            <h4 style={{ textAlign: "left"}}>Job Description: </h4>
                            <p className="listing-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};