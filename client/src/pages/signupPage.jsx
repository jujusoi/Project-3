import { useState, useEffect } from "react";

export default function SignUpPage() {

    const [checkboxValue, setCheckboxValue] = useState('');
    const [userInformation, setUserInformation] = useState({
        firstName: '',
        lastName: '',
        age: '',
        userLocation: '',
        experience: '',
        biography: '',
        industry: '',
        isOrganisation: '',
    });

    const setCheckVal = async (target) => {
        if (target.name === 'yes-org') {
            setCheckboxValue('yes');
            document.querySelector('#no-org').checked = false;
        } else {
            setCheckboxValue('no');
            document.querySelector('#yes-org').checked = false;
        };
    };

    useEffect(() => {
        const checkDisplay = document.querySelector('#signup-org-hold');
        if (checkboxValue != '') {
            checkDisplay.style.opacity = 0;
            setTimeout(() => {
                checkDisplay.style.display = 'none';
            }, 1000);
        }
    }, [checkboxValue]);

    return (
        <>
            <section id="signup-sect" style={{ marginTop: 35 }}>
                <div id="signup-holder" style={{ margin: 'auto', width: '70%', display: 'flex', flexDirection: 'column'}}>
                    <div id="signup-title-hold" style={{ marginBottom: 35 }}>
                        <h1>Create an account</h1>
                    </div>
                    <div id="signup-org-hold" style={{ display: 'flex', flexDirection: 'column'}}>
                        <div id="org-title-hold">
                            <h2 style={{ marginBottom: 15}}>Are you an organisation?</h2>
                            <p style={{ marginBottom: 5}}>Organisations have the ability to create and post job listings for open positions.</p>
                            <p>If you are an individual looking to apply for open job positions, click 'No'.</p>
                        </div>
                        <div id="org-options-hold">
                            <form action="submit"  style={{  display: 'flex', width: '100%', justifyContent: 'space-evenly' }}>
                                <div id="org-yes-hold" style={{ display: 'flex', alignItems: 'center'}}>
                                    <input style={{ width: 17, height: 17, marginRight: 10}} type="checkbox" name="yes-org" id="yes-org" onClick={() => setCheckVal(event.target)} />
                                    <label htmlFor="yes-org">Yes</label>
                                </div>
                                <div id="org-no-hold" style={{ display: 'flex', alignItems: 'center'}}>
                                    <input style={{ width: 17, height: 17, marginRight: 10}} type="checkbox" name="no-org" id="no-org" onClick={() => setCheckVal(event.target)} />
                                    <label htmlFor="no-org">No</label>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div id="signup-info-hold">
                    <div id="info-hold">
                            <h2 style={{ marginBottom: 15}}>Who are you?</h2>
                            <p style={{ marginBottom: 15}}>Fill out these inputs to start your profile setup! This information will be visible on your profile page to let employers get a better sense of who you are.  </p>
                        </div>
                        <form action="submit" style={{ display: 'flex', flexDirection: 'column'}}>
                        <div id="first-last-hold" style={{ display: 'flex', justifyContent: 'space-evenly', width: '100%', marginBottom: 20 }}>
                            <div id="firstName-hold" style={{ display: 'flex', flexDirection: 'column', textAlign: 'left', width: '30%'}}>
                                <label htmlFor="firstName">First Name:</label>
                                <input type="text" name="firstName" id="firstName" placeholder="Your first name" required />
                            </div>
                            <div id="lastName-hold" style={{ display: 'flex', flexDirection: 'column', textAlign: 'left', width: '30%'}}>
                                <label htmlFor="lastName">Last Name:</label>
                                <input type="text" name="lastName" id="lastName" placeholder="Your last name" required />
                            </div>
                            <div id="age-hold" style={{ display: 'flex', flexDirection: 'column', textAlign: 'left'}}>
                                <label htmlFor="age">Age:</label>
                                <input type="number" name="age" id="age" min={14} max={70} placeholder="14-70" required />
                            </div>
                        </div>
                        <div id="location-industry-hold" style={{ display: 'flex', justifyContent: 'space-evenly', width: '100%', marginBottom: 20 }}>
                            <div id="location-hold" style={{ display: 'flex', flexDirection: 'column', textAlign: 'left', width: '38%'}}>
                                <label htmlFor="location">Location:</label>
                                <input type="text" name="location" id="location" placeholder="Enter your city" required />
                            </div>
                            <div id="industry-hold" style={{ display: 'flex', flexDirection: 'column', textAlign: 'left', width: '38%'}}>
                                <label htmlFor="industry">Industry:</label>
                                <input type="text" name="industry" id="industry" placeholder="Preferred Industry?" required />
                            </div>
                        </div>
                        <div id="experience-hold" style={{ display: 'flex', justifyContent: 'space-evenly', width: '100%', marginBottom: 20 }}>
                            <div id="exp-div" style={{ width: '84%', textAlign: 'left'}}>
                                <label htmlFor="experience">Experience?</label>
                                <textarea name="experience" id="experience" rows="3" style={{ width: '100%'}} placeholder="Previous job experience, volunteering, etc." required></textarea>
                            </div>
                        </div>
                        <div id="biography-hold" style={{ display: 'flex', justifyContent: 'space-evenly', width: '100%', marginBottom: 20 }}>
                            <div id="bio-div" style={{ width: '84%', textAlign: 'left'}}>
                                <label htmlFor="biography">Biography:</label>
                                <textarea name="biography" id="biography" rows="5" style={{ width: '100%'}} placeholder="A deep-dive into who you are. Your passions, interests and goals. Where do you see yourself in the future? etc." required></textarea>
                            </div>
                        </div>
                        <button style={{ width: '20%', margin: 'auto' }}>Submit details</button>
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
}