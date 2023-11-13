

export default function SignUpOrg( { handleChange, activateEmpass } ) { 
    return ( 

        <>
        <div id="info-hold">
           <h2 style={{ marginBottom: 15 }}>Who are you?</h2>
           <p style={{ marginBottom: 15 }}>Fill out these inputs to start your organisation setup! This information will be visible on your org page to let potential employees get a better sense of who you are and what they're getting themselves into when applying for a listing.  </p>
       </div>
       <form id="info-form" action="submit" style={{ display: 'flex', flexDirection: 'column' }} onSubmit={(event) => activateEmpass(event)}>
           <div id="first-last-hold" style={{ display: 'flex', justifyContent: 'space-evenly', width: '100%', marginBottom: 20 }}>
               <div id="orgName-hold" style={{ display: 'flex', flexDirection: 'column', textAlign: 'left', width: '38%' }}>
                   <label htmlFor="orgName">Organisation Name:</label>
                   <input type="text" name="orgName" id="orgName" placeholder="Your first name" required onChange={() => handleChange(event.target, event.target.value)} />
               </div>
               <div id="profilePicture-hold" style={{ display: 'flex', flexDirection: 'column', textAlign: 'left', width: '38%' }}>
                   <label htmlFor="profilePicture">Organisation Photo:</label>
                   <input type="text" name="profilePicture" id="profilePicture" placeholder="Link to your organisation's logo." required onChange={() => handleChange(event.target, event.target.value)} />
               </div>
           </div>
           <div id="location-industry-hold" style={{ display: 'flex', justifyContent: 'space-evenly', width: '100%', marginBottom: 20 }}>
               <div id="location-hold" style={{ display: 'flex', flexDirection: 'column', textAlign: 'left', width: '38%' }}>
                   <label htmlFor="userLocation">Location:</label>
                   <input type="text" name="userLocation" id="userLocation" placeholder="Organisation location" required onChange={() => handleChange(event.target, event.target.value)} />
               </div>
               <div id="industry-hold" style={{ display: 'flex', flexDirection: 'column', textAlign: 'left', width: '38%' }}>
                   <label htmlFor="industry">Industry:</label>
                   <input type="text" name="industry" id="industry" placeholder="Organisation's primary industry" required onChange={() => handleChange(event.target, event.target.value)} />
               </div>
           </div>
           <div id="biography-hold" style={{ display: 'flex', justifyContent: 'space-evenly', width: '100%', marginBottom: 20 }}>
               <div id="bio-div" style={{ width: '84%', textAlign: 'left' }}>
                   <label htmlFor="biography">Biography:</label>
                   <textarea name="biography" id="biography" rows="5" style={{ width: '100%' }} placeholder="A deep-dive into what your business is. Your values, aspirations, and accomplishments. What are you looking out of potential candidates? etc." required onChange={() => handleChange(event.target, event.target.value)}></textarea>
               </div>
           </div>
           <button style={{ width: '20%', margin: 'auto' }}>Submit details</button>
       </form>
       </>
    );
}