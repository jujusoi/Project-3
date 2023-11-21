import Auth from '../../utilities/auth';

import MinilistingComponent from '../listingComps/miniListingComp';

import { useState, useEffect } from 'react';
import EditButtons from './editButtons';

import { useMutation } from '@apollo/client';
import { EDIT_PROFILE } from '../../utilities/mutations';

export default function NormalUserProfile({ profileData, refetch }) {

    document.title = 'Vinterview - ' + profileData.firstName + ' ' + profileData.lastName;

    const [onOrOff, setOnOrOff] = useState(false);
    const [editButtonC, setEditButtonC] = useState('');
    const [editData, setEditData] = useState({
        industry: profileData.industry,
        biography: profileData.biography,
        experience: profileData.experience,
        userLocation: profileData.userLocation,
    });

    const [editProfile, { error }] = useMutation(EDIT_PROFILE);

    let isLoggedIn;
    if (Auth.getToken()) {
        isLoggedIn = true;
    };

    useEffect(() => {
        if (isLoggedIn && Auth.getProfile().data.userInfo._id === profileData._id) {
            const allInputs = document.getElementsByClassName('edit-input');
            const allEdits = document.getElementsByClassName('edit-desc');
            if (onOrOff) {
                document.querySelector('#profile-cancel-btn').style.display = 'inline';
                setEditButtonC(' Save changes');
                for (let index = 0; index < allInputs.length; index++) {
                    const element = allInputs[index];
                    element.style.display = 'block';
                    setTimeout(() => {
                        element.style.opacity = 1;
                        if (element.type == 'textarea') {
                            element.style.height = '200px';
                        } else {
                            element.style.height = '45px';
                        }
                        setTimeout(() => {
                            element.style.width = '100%'
                        }, 200);
                    }, 100);
                };
            } else {
                document.querySelector('#profile-cancel-btn').style.display = 'none';
                setEditButtonC('');
                for (let index = 0; index < allInputs.length; index++) {
                    const element = allInputs[index];
                    const secondEle = allEdits[index];
                    element.style.opacity = 0;
                    element.style.height = '1px';
                    secondEle.style.display = 'none';
                    setTimeout(() => {
                        element.type == 'textarea' ? element.style.width = '25%' : element.style.width = '5%'
                        setTimeout(() => {
                            element.style.display = 'none';
                            secondEle.style.display = 'inline';
                        }, 350);
                    }, 200);
                }
            }
        } else {
            return;
        }
    }, [onOrOff]);

    const handleSubmitChanges = async (event) => {
        const newObj = {
            ...editData, isOrganisation: false, _id: Auth.getProfile().data.userInfo._id
        };
        if (newObj) {
            try {
                const { data } = await editProfile({
                    variables: { editInfo: { ...newObj } },
                });
                if (data) {
                    setTimeout(() => {
                        Auth.setToken(data.editProfile.token)
                        refetch();
                    }, 300);
                } else {
                    console.error('Could not edit data');
                }
            } catch (err) {
                console.error(err);
            };
        };
    };

    const changeEditInfo = (target, value) => {
        setEditData(previousEditData => ({
            ...previousEditData,
            [target.name]: value,
        }));
    };

    return (
        <>
            <section>
                <div id='main-prof-hold' style={{ width: '80%', margin: 'auto' }}>
                    <div className="job-listing" style={{ display: 'flex', flexDirection: "column", margin: '40px auto', width: '100%' }}>
                        <div className="liinfo-hold" style={{ display: "flex", flexDirection: "column" }}>
                            <div className="tsd-hold" style={{ display: "flex", justifyContent: 'space-between', marginBottom: 15, alignItems: 'center' }}>
                                <div id="td-div" className="ts-hold" style={{ display: 'flex', width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <div id='prof-mg' style={{ display: 'flex', flexDirection: 'row' }}>
                                        <img width={120} height={120} src={profileData.profilePicture} style={{ borderRadius: 100 }}></img>
                                        <div id='profmaininfo' style={{ display: 'flex', flexDirection: 'column', textAlign: 'left', justifyContent: 'center', marginLeft: 40 }}>
                                            <h1 style={{ textAlign: 'left', marginTop: 0, marginBottom: 5 }} className="listing-title">{profileData.firstName} {profileData.lastName}, {profileData.age}</h1>
                                            <div id='profindloc' style={{ display: 'flex' }}>
                                                <div id='profaccindustry' style={{ display: 'flex', flexDirection: 'column', marginRight: 20 }}>
                                                    <p className='listing-not'>Looking for a job in: <b className='edit-desc' style={{ display: onOrOff ? 'none' : 'inline' }}>{profileData.industry}</b></p>
                                                    <input style={{ display: 'none', width: '5%', opacity: 0, height: 0, padding: 20, marginBottom: 15 }} className='edit-input' name="industry" id="industry" value={editData.industry} onChange={(event) => changeEditInfo(event.target, event.target.value)} autoComplete='off'></input>
                                                </div>
                                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                    <p className='listing-not'>Near: <b className='edit-desc' style={{ display: onOrOff ? 'none' : 'inline' }}>{editData.userLocation}</b></p>
                                                    <input style={{ display: 'none', width: '5%', opacity: 0, height: 0, padding: 20 }} className='edit-input' name="userLocation" id="userLocation" value={editData.userLocation} onChange={(event) => changeEditInfo(event.target, event.target.value)} autoComplete='off'></input>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {isLoggedIn && Auth.getProfile().data.userInfo._id === profileData._id ? (<EditButtons setOnOrOff={setOnOrOff} onOrOff={onOrOff} handleSubmitChanges={handleSubmitChanges} editButtonC={editButtonC} />) : ('')}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section id="org-profile-sect" style={{ boxShadow: 'rgba(0, 0, 0, 0.25) 0px 0px 15px 4px inset' }}>
                <div id="org-profile-holder" style={{ marginTop: 40, width: '80%', margin: 'auto' }}>
                    <div id="org-lbc-hold" style={{ display: "flex", flexDirection: 'column', textAlign: "left", padding: 35 }}>
                        <div className="lidesc-hold" style={{ textAlign: 'left', borderLeft: '5px solid #032075', padding: 30, boxShadow: 'rgba(0, 0, 0, 0.07) 7px 7px 7px 0px', borderRadius: 5, marginBottom: 30 }}>
                            <h4>Biography: </h4>
                            <p className="listing-description edit-desc" style={{ display: onOrOff ? 'none' : 'block', width: '100%' }}>{profileData.biography}</p>
                            <textarea style={{ display: 'none', width: '20%', opacity: 0, height: 0, padding: 20 }} className='edit-input' name="biography" id="biography" rows="5" value={editData.biography} onChange={(event) => changeEditInfo(event.target, event.target.value)} autoComplete='off'></textarea>
                        </div>
                        <div className="lidesc-hold" style={{ textAlign: 'left', borderLeft: '5px solid #032075', padding: 30, boxShadow: 'rgba(0, 0, 0, 0.07) 7px 7px 7px 0px', borderRadius: 5, marginBottom: 30 }}>
                            <h4>Experience: </h4>
                            <p className="listing-description edit-desc" style={{ display: onOrOff ? 'none' : 'block', width: '100%' }}>{profileData.experience}</p>
                            <textarea style={{ display: 'none', width: '20%', opacity: 0, height: 0, padding: 20 }} className='edit-input' name="experience" id="experience" rows="5" value={editData.experience} onChange={(event) => changeEditInfo(event.target, event.target.value)} autoComplete='off'></textarea>
                        </div>
                    </div>
                </div>
            </section>
            <section>
                {isLoggedIn && Auth.getProfile().data.userInfo._id === profileData._id ? (<div id="mini-joblist-hold" style={{ display: "flex", flexDirection: "column", width: '80%', margin: '40px auto' }}>
                    <h1 style={{ textAlign: 'left' }}>{profileData.savedListings.length == 0 ? "You have no saved job listings!" : "Your saved job listings:"}</h1>
                    <p style={{ textAlign: 'left', marginBottom: 30 }}>Click the blue bookmark icon next to job listings on the listing page to save your selections here. Access your personalized collection anytime to refer to and query information while in chats.
                    </p>
                    <div id="org-minilist-holder" style={{ display: 'flex', overflowX: 'scroll', width: '100%', padding: 30 }}>
                        {profileData.savedListings.map((listing) => {
                            return (
                                <MinilistingComponent data={listing} />
                            );
                        })}
                    </div>
                </div>) : <div></div>}
            </section>
        </>
    );
}