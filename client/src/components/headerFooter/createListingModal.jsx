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
            if (!data) {
                setErrorMessage('All input fields required')
            }
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        console.log(errorMessage);
    }, [errorMessage]);
    
    if (!loading) {
        return (
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalCenterTitle">Create new listing</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body" style={{ height: 500, textAlign: 'left', padding: 30 }}>
                        <form action="submit" onSubmit={(event) => {handleInputSubmit(event), checkInputs()}}>
                            <div id="create-listing-hold" style={{ display: showStatus ? 'none' : 'block' }}>
                                <div id="createlisting-desc-hold" style={{ display: 'flex', flexDirection: 'column' }}>
                                    <h2>Create Listing</h2>
                                    <p>Listings help you find potential employees for available roles in your organisation. Create a listing to get people interested in starting chats!</p>
                                </div>
                                <div id="createlisting-JTJTY-hold" style={{ display: 'flex', justifyContent: 'space-around', marginBottom: 15 }}>
                                    <div style={{ width: '40%' }}>
                                        <h4>Job Title</h4>
                                        <p>The name of your open position.</p>
                                        <input type="text" name="title" id="job-title-input" placeholder="Register worker..." required onChange={(event) => handleInputChange(event.target)} value={listingInputs.title} className='listing-input-area' />
                                    </div>
                                    <div style={{ width: '40%' }}>
                                        <h4>Employment</h4>
                                        <p>Full time, part time, or casual.</p>
                                        <input type="text" name="jobType" id="job-type-input" placeholder="Full time" required onChange={(event) => handleInputChange(event.target)} value={listingInputs.jobType} className='listing-input-area' />
                                    </div>
                                </div>
                                <div id="createlisting-JLJS-hold" style={{ display: 'flex', justifyContent: 'space-around' }}>
                                    <div style={{ width: '40%' }}>
                                        <h4>Job Location</h4>
                                        <p>The name of your open position.</p>
                                        <input type="text" name="location" id="job-location-input" placeholder="Brisbane, QLD" required onChange={(event) => handleInputChange(event.target)} value={listingInputs.location} className='listing-input-area' />
                                    </div>
                                    <div style={{ width: '40%' }}>
                                        <h4>Salary</h4>
                                        <p>Average yearly salary. Include currency</p>
                                        <input type="text" name="salary" id="job-salary-input" placeholder="$45,000 - $60,000 AUD" required onChange={(event) => handleInputChange(event.target)} value={listingInputs.salary} className='listing-input-area' />
                                    </div>
                                </div>
                            </div>
                            <div id="create-listing-hold-1" style={{ display: showStatus ? 'flex' : 'none', flexDirection: 'column', height: '100%' }}>
                                <div id="createlisting-bio-hold" style={{ display: 'flex', flexDirection: 'column', height: '30%', marginBottom: 15 }}>
                                    <h3>Create Job Description</h3>
                                    <p>Provide an in depth account about your open position and its location. What are you looking for in an employee? What values and goals are you pertaining to as an organisation?</p>
                                </div>
                                <div id="createlisting-JTJTY-hold" style={{ display: 'flex', justifyContent: 'space-around', marginBottom: 15, height: '60%' }}>
                                    <textarea name="jobDescription" id="job-desc-edit" rows="7" style={{ width: '100%', padding: 15, resize: 'none' }} placeholder="Placeholder text" onChange={(event) => handleInputChange(event.target)}value={listingInputs.jobDescription} className='listing-input-area'></textarea>
                                </div>
                                <button type="submit" id="create-listing-button">Create Listing</button>
                                <p style={{ textAlign: 'center', marginTop: 15}}>{errorMessage}</p>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer" style={{ display: 'flex', flexDirection: showStatus ? 'row-reverse' : 'row' }}>
                        <button onClick={() => setShowStatus(!showStatus)} id="next-listing-btn" type="button" class="btn btn-primary">{showStatus ? 'Back' : 'Next'}</button>
                    </div>
                </div>
            </div>
        );
    }
};