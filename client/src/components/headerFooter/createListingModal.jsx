import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_ORG_DATA_LISTING } from "../../utilities/queries";
import { CREATE_LISTING } from "../../utilities/mutations";

import Auth from '../../utilities/auth';

export default function ListingModal() {

    const [showStatus, setShowStatus] = useState(false);
    const [listingInputs, setListingInputs] = useState({
        title: '',
        location: '',
        salary: '',
        jobType: '',
        jobDescription: '',
    });
    const [errorMessage, setErrorMessage] = useState('');

    const { loading, data } = useQuery(GET_ORG_DATA_LISTING, {
        variables: { profileId: Auth.getProfile().data.userInfo._id }
    });
    const [ createListing, { error }] = useMutation(CREATE_LISTING);

    const handleInputChange = (target) => {
        setListingInputs(previousListingInput => ({
            ...previousListingInput,
            [target.name]: target.value,
        }));
    };

    const checkInputs = () => {
        const inputs = document.getElementsByClassName('listing-input-area');
        for (let i = 0; i < inputs.length; i++) {
            const input = inputs[i];
            input.length <= 0 ? setErrorMessage('All inputs must be filled') : setErrorMessage('');
        };
    };

    const handleInputSubmit = async (event) => {
        event.preventDefault();
        const newObj = {
            ...listingInputs,
            industry: data.profileById.industry,
            organisationName: data.profileById.orgName,
            poster: data.profileById._id
        };
        try {
            const { data } = await createListing({
                variables: { listingInfo: { ...newObj }}
            });
            if (data) {
                window.location.assign(`/listing/${data.createListing._id}`)
            }
        } catch (err) {
            console.error(err);
            setErrorMessage('All input fields required')
            setTimeout(() => {
                setErrorMessage('')
            }, 4000);
        }
    };

    if (!loading) {
        return (
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header" style={{ minHeight: 100, padding: '0px 30px'}}>
                        <h2 className="modal-title" id="exampleModalCenterTitle">Create new listing</h2>
                        <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body" style={{ height: 500, textAlign: 'left', padding: 25, boxShadow: 'rgba(0, 0, 0, 0.15) 0px 10px 12px 0px inset' }}>
                        <form action="submit" onSubmit={(event) => {handleInputSubmit(event), checkInputs()}}>
                            <div id="create-listing-hold" style={{ display: showStatus ? 'none' : 'block'}}>
                            <div id="createlisting-desc-hold">
                                    <p>Listings help you find potential employees for available roles in your organisation. Create a listing to get people interested in starting chats!</p>
                                </div>
                                <div id="createlisting-JTJTY-hold" style={{ display: 'flex', justifyContent: 'space-around', marginBottom: 15,  padding: '20px 0px', boxShadow: 'rgba(0, 0, 0, 0.07) 7px 7px 7px 0px', borderRadius: 15  }}>
                                    <div className="listing-st-h" style={{ width: '40%' }}>
                                        <h4>Job Title</h4>
                                        <p className="listing-not">The name of your open position.</p>
                                        <input type="text" name="title" id="job-title-input" placeholder="Register worker..."  onChange={(event) => handleInputChange(event.target)} value={listingInputs.title} className='listing-input-area login-inputs' style={{ minWidth: 180, width: 180}} autoComplete="off" />
                                    </div>
                                    <div className="listing-st-h" style={{ width: '40%' }}>
                                        <h4>Employment</h4>
                                        <p className="listing-not">Full time, part time, or casual.</p>
                                        <input type="text" name="jobType" id="job-type-input" placeholder="Full time"  onChange={(event) => handleInputChange(event.target)} value={listingInputs.jobType} className='listing-input-area login-inputs' style={{ minWidth: 180, width: 180}} autoComplete="off" />
                                    </div>
                                </div>
                                <div id="createlisting-JLJS-hold" style={{ display: 'flex', justifyContent: 'space-around',  padding: '20px 0px', boxShadow: 'rgba(0, 0, 0, 0.07) 7px 7px 7px 0px', borderRadius: 15 }}>
                                    <div className="listing-st-h" style={{ width: '40%' }}>
                                        <h4>Job Location</h4>
                                        <p className="listing-not">Where's the work focused?</p>
                                        <input type="text" name="location" id="job-location-input" placeholder="Brisbane, QLD"  onChange={(event) => handleInputChange(event.target)} value={listingInputs.location} className='listing-input-area login-inputs' style={{ minWidth: 180, width: 180}} autoComplete="off" />
                                    </div>
                                    <div className="listing-st-h" style={{ width: '40%' }}>
                                        <h4>Salary</h4>
                                        <p className="listing-not">Average yearly salary. Include currency.</p>
                                        <input type="text" name="salary" id="job-salary-input" placeholder="$45,000 - $60,000 AUD"  onChange={(event) => handleInputChange(event.target)} value={listingInputs.salary} className='listing-input-area login-inputs' style={{ minWidth: 180, width: 180}} autoComplete="off" />
                                    </div>
                                </div>
                            </div>
                            <div id="create-listing-hold-1" style={{ display: showStatus ? 'flex' : 'none', flexDirection: 'column', height: '100%' }}>
                                <div id="createlisting-bio-hold" style={{ display: 'flex', flexDirection: 'column', height: '30%', marginBottom: 15 }}>
                                    <h3>Create Job Description</h3>
                                    <p className="listing-not">Provide an in depth account about your open position and its location. What are you looking for in an employee? What values and goals are you pertaining to as an organisation? Etc.</p>
                                </div>
                                <div id="createlisting-JTJTY-hold" style={{ display: 'flex', justifyContent: 'space-around', marginBottom: 15, height: '60%' }}>
                                    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', padding: '15px', boxShadow: 'rgba(0, 0, 0, 0.07) 7px 7px 7px 0px', borderRadius: 15}}>
                                    <textarea name="jobDescription" id="job-desc-edit" rows="7" style={{ width: '100%', padding: 15, marginBottom: 10, resize: 'none' }} placeholder="Placeholder text" onChange={(event) => handleInputChange(event.target)}value={listingInputs.jobDescription} className='listing-input-area login-inputs'></textarea>
                                    <button type="submit" id="create-listing-button">Create Listing</button>
                                <p id="create-listing-err" style={{ textAlign: 'center', marginTop: 15, color: 'red' }}>{errorMessage}</p>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer" style={{ display: 'flex', flexDirection: showStatus ? 'row-reverse' : 'row', borderTop: 'none' }}>
                        <button onClick={() => setShowStatus(!showStatus)} id="next-listing-btn" type="button" className="btn btn-primary">{showStatus ? 'Back' : 'Next'}</button>
                    </div>
                </div>
            </div>
        );
    }
};