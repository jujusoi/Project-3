import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";

import { CREATE_PROFILE } from "../utilities/mutations";

import Auth from '../utilities/auth';
import SignUpProfile from "../components/loginSign/signUpUseProfile";
import SignUpOrg from "../components/loginSign/signUpUseOrg";

import { Link } from "react-router-dom";

export default function SignUpPage() {

    document.title = 'Vinterview - Create Account'

    const [checkboxValue, setCheckboxValue] = useState('');
    const [userInformation, setUserInformation] = useState({
        firstName: '',
        lastName: '',
        age: 0,
        userLocation: '',
        experience: '',
        biography: '',
        industry: '',
        isOrganisation: false,
        email: '',
        password: '',
        profilePicture: '',
        orgName: '',
    });

    const [ createProfile, { error }] = useMutation(CREATE_PROFILE);

    const handleChange = (target, value) => {
        if (target.name) {
            setUserInformation(previousUserInformation => ({
                ...previousUserInformation,
                [target.name]: value,
            }));
        };
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        userInformation.profilePicture.length < 10 ? delete userInformation.profilePicture : '';
        try {
            const { data } = await createProfile({
                variables: { profileInfo: userInformation }
            });
            if (data) {
                Auth.login(data.createProfile.token);
            };
        } catch {
            console.error(error);
        };
    };

    const setCheckVal = async (target) => {
        if (target.name === 'yes-org') {
            setCheckboxValue('yes');
            document.querySelector('#no-org').checked = false;
            setUserInformation(previousUserInformation => ({
                ...previousUserInformation,
                isOrganisation: true,
            }));
        } else {
            setCheckboxValue('no');
            document.querySelector('#yes-org').checked = false;
            setUserInformation(previousUserInformation => ({
                ...previousUserInformation,
                isOrganisation: false,
            }));
        };
    };

    useEffect(() => {
        const checkDisplay = document.querySelector('#signup-org-hold');
        const infoDisplay = document.querySelector('#signup-info-hold');
        if (checkboxValue != '') {
            checkDisplay.style.opacity = 0;
            setTimeout(() => {
                checkDisplay.style.display = 'none';
                infoDisplay.style.display = 'flex';
                setTimeout(() => {
                    infoDisplay.style.opacity = 1;
                }, 300);
            }, 1000);

        }
    }, [checkboxValue]);

    const activateEmpass = (event) => {
        const infoDisplay = document.querySelector('#signup-info-hold');
        const empassDisplay = document.querySelector('#email-pass-hold');
        event.preventDefault();
        infoDisplay.style.opacity = 0;
        setTimeout(() => {
            infoDisplay.style.display = 'none';
            empassDisplay.style.display = 'flex';
            setTimeout(() => {
                empassDisplay.style.opacity = 1;
            }, 300);
        }, 1000);
    };

    return (
        <>
            <section id="signup-sect" style={{ margin: 'auto', display: 'flex', justifyContent: 'center', padding: '70px 0px', width: '75%' }}>
                <div id="signup-holder" style={{ width: '75%', display: 'flex', flexDirection: 'column', minHeight: 450, padding: 25, boxShadow: 'rgba(0, 0, 0, 0.1) 7px 7px 7px 5px', borderRadius: 25 }}>
                    <div id="signup-title-hold" style={{ margin: '30px 0px' }}>
                        <h1>Create an account</h1>
                    </div>
                    <div id="signup-org-hold" style={{ display: 'flex', flexDirection: 'column', padding: 35 }}>
                        <div id="org-title-hold">
                            <h2 style={{ marginBottom: 15 }}>Are you an organisation?</h2>
                            <p style={{ marginBottom: 5 }}>Organisations have the ability to create and post job listings for open positions.</p>
                            <p>If you are an individual looking to apply for open job positions, click 'No'.</p>
                        </div>
                        <div id="org-options-hold" style={{ marginTop: 40, borderRadius: 25, boxShadow: 'rgba(0, 0, 0, 0.05) 5px 5px 12px 0px', padding: 35}}>
                            <form action="submit" style={{ display: 'flex', width: '100%', justifyContent: 'space-evenly' }}>
                                <div id="org-yes-hold" style={{ display: 'flex', alignItems: 'center' }}>
                                    <input style={{ width: 18, height: 18, marginRight: 10 }} type="checkbox" name="yes-org" id="yes-org" onClick={() => setCheckVal(event.target)} />
                                    <label htmlFor="yes-org">Yes</label>
                                </div>
                                <div id="org-no-hold" style={{ display: 'flex', alignItems: 'center' }}>
                                    <input style={{ width: 18, height: 18, marginRight: 10 }} type="checkbox" name="no-org" id="no-org" onClick={() => setCheckVal(event.target)} />
                                    <label htmlFor="no-org">No</label>
                                </div>
                            </form>
                        </div>
                        <p className="listing-not" style={{ marginTop: 40, marginBottom: 5 }}>Already have an account?</p>
                        <Link to={'/login'}><p className="linkanchor">Login</p></Link>
                    </div>
                    <div id="signup-info-hold" style={{ display: 'none', flexDirection: 'column', opacity: 0, padding: 25 }}>
                        {checkboxValue === 'no' ? ( <SignUpProfile handleChange={handleChange} activateEmpass={activateEmpass} /> ) : ( <SignUpOrg handleChange={handleChange} activateEmpass={activateEmpass} /> )}
                    </div>
                    <div id="email-pass-hold" style={{ display: 'none', flexDirection: 'column', opacity: 0, padding: 35 }}>
                        <div id="empass-title-hold">
                            <h2>Email & Password</h2>
                            <p >You're almost there! All that's left is your email and a unique password to authenticate your profile!</p>
                        </div>
                        <form id="empass-form" action="submit" onSubmit={() => handleSubmit(event)} style={{ padding: '35px 10px', boxShadow: 'rgba(0, 0, 0, 0.05) 5px 5px 12px 0px', borderRadius: 25 }}>
                            <div id="empass-hold" style={{ display: 'flex', justifyContent: 'space-evenly', flexDirection: 'column', alignItems: 'center', textAlign: 'left', marginBottom: 40 }}>
                                <div id="email-hold" style={{ display: 'flex', flexDirection: 'column', width: '90%', marginBottom: 25, maxWidth: 450 }}>
                                    <label htmlFor="email">Email:</label>
                                    <input className="login-inputs" type="email" name="email" id="email" required onChange={() => handleChange(event.target, event.target.value)} placeholder="Enter your email"/>
                                </div>
                                <div id="pass-hold" style={{ display: 'flex', flexDirection: 'column', width: '90%', maxWidth: 450 }}>
                                    <label htmlFor="password">Password:</label>
                                    <input className="login-inputs" type="password" name="password" id="password" required onChange={() => handleChange(event.target, event.target.value)} placeholder="Enter your password" />
                                </div>
                            </div>
                            <button style={{ width: 120, margin: 'auto' }}>Create Account</button>
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
}