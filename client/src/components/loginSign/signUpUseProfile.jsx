

export default function SignUpProfile( { handleChange, activateEmpass } ) { 
    return ( 

        <>
        <div id="info-hold">
           <h2 style={{ marginBottom: 15 }}>Who are you?</h2>
           <p style={{ marginBottom: 15 }}>Fill out these inputs to start your profile setup! This information will be visible on your profile page to let employers get a better sense of who you are.  </p>
       </div>
       <form id="info-form" action="submit" style={{ display: 'flex', flexDirection: 'column' }} onSubmit={(event) => activateEmpass(event)}>
           <div id="first-last-hold" style={{ display: 'flex', justifyContent: 'space-evenly', width: '100%', marginBottom: 20 }}>
               <div id="firstName-hold" style={{ display: 'flex', flexDirection: 'column', textAlign: 'left', width: '30%' }}>
                   <label htmlFor="firstName">First Name:</label>
                   <input type="text" name="firstName" id="firstName" placeholder="Your first name" required onChange={() => handleChange(event.target, event.target.value)} />
               </div>
               <div id="lastName-hold" style={{ display: 'flex', flexDirection: 'column', textAlign: 'left', width: '30%' }}>
                   <label htmlFor="lastName">Last Name:</label>
                   <input type="text" name="lastName" id="lastName" placeholder="Your last name" required onChange={() => handleChange(event.target, event.target.value)} />
               </div>
               <div id="age-hold" style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
                   <label htmlFor="age">Age:</label>
                   <input type="number" name="age" id="age" min={14} max={70} placeholder="14-70" required onChange={() => handleChange(event.target, parseInt(event.target.value))} />
               </div>
           </div>
           <div id="location-industry-hold" style={{ display: 'flex', justifyContent: 'space-evenly', width: '100%', marginBottom: 20 }}>
               <div id="location-hold" style={{ display: 'flex', flexDirection: 'column', textAlign: 'left', width: '38%' }}>
                   <label htmlFor="userLocation">Location:</label>
                   <input type="text" name="userLocation" id="userLocation" placeholder="Enter your city" required onChange={() => handleChange(event.target, event.target.value)} />
               </div>
               <div id="industry-hold" style={{ display: 'flex', flexDirection: 'column', textAlign: 'left', width: '38%' }}>
                   <label htmlFor="industry">Industry:</label>
                   <input type="text" name="industry" id="industry" placeholder="Preferred Industry?" required onChange={() => handleChange(event.target, event.target.value)} />
               </div>
           </div>
           <div id="pfp-hold" style={{ display: 'flex', justifyContent: 'space-evenly', width: '100%', marginBottom: 20 }}>
               <div id="exp-div" style={{ width: '84%', textAlign: 'left' }}>
                   <label htmlFor="profilePicture">Profile picture:</label>
                   <input name="profilePicture" id="profilePicture" style={{ width: '100%' }} placeholder="Embed link input only." onChange={() => handleChange(event.target, event.target.value)}></input>
               </div>
           </div>
           <div id="experience-hold" style={{ display: 'flex', justifyContent: 'space-evenly', width: '100%', marginBottom: 20 }}>
               <div id="exp-div" style={{ width: '84%', textAlign: 'left' }}>
                   <label htmlFor="experience">Experience?</label>
                   <textarea name="experience" id="experience" rows="3" style={{ width: '100%' }} placeholder="Previous job experience, volunteering, etc." required onChange={() => handleChange(event.target, event.target.value)}></textarea>
               </div>
           </div>
           <div id="biography-hold" style={{ display: 'flex', justifyContent: 'space-evenly', width: '100%', marginBottom: 20 }}>
               <div id="bio-div" style={{ width: '84%', textAlign: 'left' }}>
                   <label htmlFor="biography">Biography:</label>
                   <textarea name="biography" id="biography" rows="5" style={{ width: '100%' }} placeholder="A deep-dive into who you are. Your passions, interests and goals. Where do you see yourself in the future? etc." required onChange={() => handleChange(event.target, event.target.value)}></textarea>
               </div>
           </div>
           <button style={{ width: '20%', margin: 'auto' }}>Submit details</button>
       </form>
       </>
    );
}