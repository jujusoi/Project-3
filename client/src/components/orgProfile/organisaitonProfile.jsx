import { useQuery, useMutation } from "@apollo/client";

import MinilistingComponent from "../listingComps/miniListingComp";
import { QUERY_LISTING_BY_ORGANISATION_FOR_PROF } from "../../utilities/queries";
import LoadingPage from "../../pages/loadingPage";
import EditButtons from "../userProfile/editButtons";
import Auth from '../../utilities/auth';
import { useEffect, useRef, useState } from "react";

import { EDIT_PROFILE } from '../../utilities/mutations';

export default function OrganisationProfile({ profileData, refetch }) {

    const [onOrOff, setOnOrOff] = useState(false);
    const [editButtonC, setEditButtonC] = useState('');
    const [editData, setEditData] = useState({
        industry: profileData.industry,
        biography: profileData.biography,
        userLocation: profileData.userLocation,
    });

    const [editProfile, { error }] = useMutation(EDIT_PROFILE);

    let isLoggedIn;
    if (Auth.getToken()) {
        isLoggedIn = true;
    };

    const orgName = profileData.orgName;
    let index = 0;

    const { loading, data } = useQuery(QUERY_LISTING_BY_ORGANISATION_FOR_PROF, {
        variables: { orgName },
    });

    useEffect(() => {
        if (isLoggedIn && Auth.getProfile().data.userInfo._id === profileData._id) {
            const allInputs = document.getElementsByClassName('edit-input');
            const allEdits = document.getElementsByClassName('edit-desc');
            const cancelButton = document.querySelector('#profile-cancel-btn')
            if (cancelButton) {

                if (onOrOff) {
                    cancelButton.style.display = 'inline';
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
                                element.style.width = '100%'
                            }, 200);
                        }, 100);
                    };
                } else {
                    cancelButton.style.display = 'none';
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
            }
        } else {
            return;
        }
    }, [onOrOff]);

    const handleSubmitChanges = async (event) => {
        const newObj = {
            ...editData, isOrganisation: true, _id: Auth.getProfile().data.userInfo._id
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

    if (loading) {
        return (
            <LoadingPage />
        );
    } else {
        return (
            <>

                <section>
                    <div id='main-prof-hold' style={{ width: '80%', margin: 'auto' }}>
                        <div className="job-listing" style={{ display: 'flex', flexDirection: "column", margin: '40px auto', width: '100%' }}>
                            <div className="liinfo-hold" style={{ display: "flex", flexDirection: "column" }}>
                                <div className="tsd-hold" style={{ display: "flex", justifyContent: 'space-between', marginBottom: 15, alignItems: 'center' }}>
                                    <div id="td-div" className="ts-hold org-ho" style={{ display: 'flex', width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <div id='prof-mg' style={{ display: 'flex', flexDirection: 'row' }}>
                                            <img width={120} height={120} src={profileData.profilePicture} style={{ borderRadius: 100 }}></img>
                                            <div id="orghd" style={{ display: 'flex', flexDirection: 'column', textAlign: 'left', justifyContent: 'center', marginLeft: 40 }}>
                                                <h1 id="orgli-ti" style={{ textAlign: 'left', marginTop: 0, marginBottom: 5 }} className="listing-title">{profileData.orgName}<span style={{ marginLeft: 15, color: 'rgb(58, 82, 157)'}} className="bi bi-person-check"></span></h1>
                                                <div id='profindloc' style={{ display: 'flex' }}>
                                                    <div id='profaccindustry' style={{ display: 'flex', flexDirection: 'column', marginRight: 20 }}>
                                                        <p className='listing-not'>Providing listings in: <b className='edit-desc' style={{ display: onOrOff ? 'none' : 'inline' }}>{profileData.industry}</b></p>
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
                        </div>
                    </div>
                </section>
                <section>
                    <div id="mini-joblist-hold" style={{ display: "flex", flexDirection: "column", width: '80%', margin: '40px auto' }}>
                        <h1 style={{ textAlign: 'left' }}>Open listings by employer:</h1>
                        <p style={{ textAlign: 'left', marginBottom: 30 }}>Like what you see? Consider exploring this array of listings by {profileData.orgName}.
                        </p>
                        <div id="org-minilist-holder" style={{ display: 'flex', overflowX: 'scroll', width: '100%', padding: 30 }}>
                            {data.listingByOrganisationProf.length < 1 ? (
                                <>
                                    <p style={{ margin: 'auto'}}><i>It appears that there are currently no open listings for positions at {profileData.orgName}.</i></p>
                                </>
                            ) : (
                                data.listingByOrganisationProf.map((listing) => (
                                    <MinilistingComponent key={listing.id} data={listing} />
                                ))
                            )}
                        </div>
                    </div>
                </section>
            </>
        );
    }
}