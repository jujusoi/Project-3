import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";

import { CREATE_PROFILE } from "../utilities/mutations";

import Auth from '../utilities/auth';
import SignUpProfile from "../components/loginSign/signUpUseProfile";
import SignUpOrg from "../components/loginSign/signUpUseOrg";

export default function SignUpPage() {

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

    useEffect(() => {
        console.log(userInformation);
    }, [userInformation])

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
            <section id="signup-sect" style={{ marginTop: 35 }}>
                <div id="signup-holder" style={{ margin: 'auto', width: '70%', display: 'flex', flexDirection: 'column' }}>
                    <div id="signup-title-hold" style={{ marginBottom: 35 }}>
                        <h1>Create an account</h1>
                    </div>
                    <div id="signup-org-hold" style={{ display: 'flex', flexDirection: 'column' }}>
                        <div id="org-title-hold">
                            <h2 style={{ marginBottom: 15 }}>Are you an organisation?</h2>
                            <p style={{ marginBottom: 5 }}>Organisations have the ability to create and post job listings for open positions.</p>
                            <p>If you are an individual looking to apply for open job positions, click 'No'.</p>
                        </div>
                        <div id="org-options-hold">
                            <form action="submit" style={{ display: 'flex', width: '100%', justifyContent: 'space-evenly' }}>
                                <div id="org-yes-hold" style={{ display: 'flex', alignItems: 'center' }}>
                                    <input style={{ width: 17, height: 17, marginRight: 10 }} type="checkbox" name="yes-org" id="yes-org" onClick={() => setCheckVal(event.target)} />
                                    <label htmlFor="yes-org">Yes</label>
                                </div>
                                <div id="org-no-hold" style={{ display: 'flex', alignItems: 'center' }}>
                                    <input style={{ width: 17, height: 17, marginRight: 10 }} type="checkbox" name="no-org" id="no-org" onClick={() => setCheckVal(event.target)} />
                                    <label htmlFor="no-org">No</label>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div id="signup-info-hold" style={{ display: 'none', flexDirection: 'column', opacity: 0 }}>
                        {checkboxValue === 'no' ? ( <SignUpProfile handleChange={handleChange} activateEmpass={activateEmpass} /> ) : ( <SignUpOrg handleChange={handleChange} activateEmpass={activateEmpass} /> )}
                    </div>
                    <div id="email-pass-hold" style={{ display: 'none', flexDirection: 'column', opacity: 0 }}>
                        <div id="empass-title-hold">
                            <h2>Email & Password</h2>
                            <p >You're almost there! All that's left is your email and a unique password to authenticate your profile!</p>
                        </div>
                        <form id="empass-form" action="submit" onSubmit={() => handleSubmit(event)}>
                            <div id="empass-hold" style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                                <div id="email-hold" style={{ display: 'flex', flexDirection: 'column', width: '40%' }}>
                                    <label htmlFor="email">Email:</label>
                                    <input type="email" name="email" id="email" required onChange={() => handleChange(event.target, event.target.value)} />
                                </div>
                                <div id="pass-hold" style={{ display: 'flex', flexDirection: 'column', width: '36%' }}>
                                    <label htmlFor="password">Password:</label>
                                    <input type="password" name="password" id="password" required onChange={() => handleChange(event.target, event.target.value)} />
                                </div>
                            </div>
                            <button style={{ width: '20%', margin: 'auto', marginTop: 30 }}>Create Account</button>
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
}