

export default function SignUpOrg( { handleChange, activateEmpass } ) { 
    return ( 

        <>

<div id="info-hold" style={{ marginBottom: 30 }}>
           <h2 style={{ marginBottom: 15 }}>Who are you?</h2>
           <p style={{ marginBottom: 15 }}>Fill out the following inputs to start the setup for your organization. This information will be showcased on your organization's profile page, offering potential employees a better understanding of your values and what they can expect when applying for a listing</p>
       </div>
       <form id="info-form" action="submit" style={{ display: 'flex', flexDirection: 'column', padding: '35px 10px', borderRadius: 25, boxShadow: 'rgba(0, 0, 0, 0.05) 5px 5px 12px 0px' }} onSubmit={(event) => activateEmpass(event)}>
           <div id="first-last-hold" style={{ display: 'flex', justifyContent: 'space-evenly', width: '100%', marginBottom: 20 }}>
               <div className='signinputs' id="firstName-hold" style={{ display: 'flex', flexDirection: 'column', textAlign: 'left', width: '38%', minWidth: 175 }}>
               <label htmlFor="orgName">Organisation Name:</label>
                   <input className="login-inputs" type="text" name="orgName" id="orgName" placeholder="Your organisation's name" required onChange={() => handleChange(event.target, event.target.value)} />
               </div>
               <div className='signinputs' id="profilePicture-hold" style={{ display: 'flex', flexDirection: 'column', textAlign: 'left', width: '38%' }}>
               <label htmlFor="profilePicture">Organisation Photo:</label>
                   <input className="login-inputs" type="text" name="profilePicture" id="profilePicture" placeholder="Link to your organisation's logo." required onChange={() => handleChange(event.target, event.target.value)} />
               </div>
           </div>
           <div id="location-industry-hold" style={{ display: 'flex', justifyContent: 'space-evenly', width: '100%', marginBottom: 20 }}>
               <div className='signinputs' id="location-hold" style={{ display: 'flex', flexDirection: 'column', textAlign: 'left', width: '38%', minWidth: 175 }}>
                   <label htmlFor="userLocation">Location:</label>
                   <input className='login-inputs' type="text" name="userLocation" id="userLocation" placeholder="Organisation location" required onChange={() => handleChange(event.target, event.target.value)} />
               </div>
               <div className='signinputs' id="industry-hold" style={{ display: 'flex', flexDirection: 'column', textAlign: 'left', width: '38%', minWidth: 175 }}>
                   <label htmlFor="industry">Industry:</label>
                   <input className='login-inputs' type="text" name="industry" id="industry" placeholder="Organisation industry" required onChange={() => handleChange(event.target, event.target.value)} />
               </div>
           </div>
           <div id="biography-hold" style={{ display: 'flex', justifyContent: 'space-evenly', width: '100%', marginBottom: 20 }}>
               <div className='signinputs' id="bio-div" style={{ width: '84%', textAlign: 'left' }}>
                   <label htmlFor="biography">Biography:</label>
                   <textarea className='login-inputs' name="biography" id="biography" rows="5" style={{ width: '100%', minWidth: 175 }} placeholder="A deep-dive into who you are. Your passions, interests and goals. Where do you see yourself in the future? etc." required onChange={() => handleChange(event.target, event.target.value)}></textarea>
               </div>
           </div>
           <button style={{ width: 120, margin: 'auto' }}>Submit details</button>
       </form>
       </>
    );
}