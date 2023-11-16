import Auth from '../../utilities/auth';

import MinilistingComponent from '../listingComps/miniListingComp';

import { useState, useEffect } from 'react';
import EditButtons from './editButtons';

export default function NormalUserProfile({ profileData, refetch }) {

    const [onOrOff, setOnOrOff] = useState(false);
    const [editButtonC, setEditButtonC] = useState('');
    const [editData, setEditData] = useState({
        industry: profileData.industry,
        biography: profileData.biography,
        experience: profileData.experience,
        userLocation: profileData.userLocation,
    });

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
                            element.style.height = '130px';
                        } else {
                            element.style.height = '45px';
                        }
                        setTimeout(() => {
                            element.type == 'textarea' ? element.style.width = '100%' : element.style.width = '20%'
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

    const handleSubmitChanges = (event) => {
        console.log('saved changes');
    };

    const changeEditInfo = (target, value) => {
        console.log(editData);
        setEditData(previousEditData => ({
            ...previousEditData,
            [target.name]: value,
        }));
    };

    return (
        <>
            <section id="org-profile-sect" style={{ width: '90%', margin: 'auto' }}>
                <div id="org-profile-holder" style={{ marginTop: 40 }}>
                    <div id="org-tpi-hold" style={{ display: "flex", alignItems: 'center' }}>
                        <div id="org-pfp"><img width={100} height={100} src={profileData.profilePicture} style={{ borderRadius: 50 }}></img></div>
                        <div id="org-title-ind" style={{ textAlign: "left", marginLeft: 28, width: '90%' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <h2>{profileData.firstName} {profileData.lastName}, {profileData.age}</h2>
                                {isLoggedIn && Auth.getProfile().data.userInfo._id === profileData._id ? (<EditButtons setOnOrOff={setOnOrOff} onOrOff={onOrOff} handleSubmitChanges={handleSubmitChanges} editButtonC={editButtonC} />) : ('')}
                            </div>
                            <p>Looking for a job in: <b className='edit-desc' style={{ display: onOrOff ? 'none' : 'inline' }}>{profileData.industry}</b></p>
                            <input style={{ display: 'none', width: '5%', opacity: 0, height: 0, padding: 20 }} className='edit-input' name="industry" id="industry" value={editData.industry} onChange={(event) => changeEditInfo(event.target, event.target.value)}></input>
                        </div>
                    </div>
                    <div id="org-lbc-hold" style={{ display: "flex", flexDirection: 'column', textAlign: "left", padding: 35 }}>
                        <div id="org-loc" style={{ display: 'flex', flexDirection: 'column', marginBottom: 15 }}>
                            <h4>Location: </h4>
                            <p className='edit-desc' style={{ display: onOrOff ? 'none' : 'inline' }}> {profileData.userLocation}</p>
                            <input style={{ display: 'none', width: '5%', opacity: 0, height: 0, padding: 20 }} className='edit-input' name="userLocation" id="userLocation" value={editData.userLocation} onChange={(event) => changeEditInfo(event.target, event.target.value)}></input>
                        </div>
                        <div id="org-bio" style={{ marginBottom: 15 }}>
                            <h4>Biography:</h4>
                            <p className='edit-desc' style={{ display: onOrOff ? 'none' : 'block', width: '100%' }}>{profileData.biography}</p>
                            <textarea style={{ display: 'none', width: '20%', opacity: 0, height: 0, padding: 20 }} className='edit-input' name="biography" id="biography" rows="5" value={editData.biography} onChange={(event) => changeEditInfo(event.target, event.target.value)}></textarea>
                        </div>
                        <div id="org-exp" style={{ marginBottom: 15 }}>
                            <h4>Experience:</h4>
                            <p className='edit-desc' style={{ display: onOrOff ? 'none' : 'block', width: '100%' }}>{profileData.experience}</p>
                            <textarea style={{ display: 'none', width: '20%', opacity: 0, height: 0, padding: 20 }} className='edit-input' name="experience" id="experience" rows="5" value={editData.experience} onChange={(event) => changeEditInfo(event.target, event.target.value)}></textarea>
                        </div>
                        <div id="org-contact" style={{ marginBottom: 15 }}>
                            <h4>{profileData.firstName} {profileData.lastName[profileData.lastName.length - 1] == 's' ? profileData.lastName + `'` : profileData.lastName + `'s`} Contacts:</h4>
                            <p>Email: {profileData.email}</p>
                        </div>
                    </div>
                    {isLoggedIn && Auth.getProfile().data.userInfo._id === profileData._id ? (<div id="mini-joblist-hold" style={{ display: "flex", flexDirection: "column" }}>
                        <h3 style={{ textAlign: 'left' }}>{profileData.savedListings.length == 0 ? "You have no saved job listings!" : "Your saved job listings:"}</h3>
                        <div id="org-minilist-holder" style={{ display: 'flex', overflowX: 'scroll', width: '100%' }}>
                            {profileData.savedListings.map((listing) => {
                                return (
                                    <MinilistingComponent data={listing} />
                                );
                            })}
                        </div>
                    </div>) : <div></div>}
                </div>
            </section>
        </>
    );
}