

export default function NormalUserProfile({ profileData }) {
    return (
        <>
 <section id="org-profile-sect" style={{ width: '90%', margin: 'auto'}}>
                    <div id="org-profile-holder" style={{ marginTop: 40 }}>
                        <div id="org-tpi-hold" style={{ display: "flex", alignItems: 'center'}}>
                            <div id="org-pfp"><img width={100} height={100} src={profileData.profilePicture} style={{ borderRadius: 50}}></img></div>
                            <div id="org-title-ind" style={{ textAlign: "left", marginLeft: 28 }}>
                                <h2>{profileData.firstName} {profileData.lastName}</h2>
                                <p>Looking for a job in: <b>{profileData.industry}  </b></p>
                            </div>
                        </div>
                        <div id="org-lbc-hold" style={{ display: "flex", flexDirection: 'column', textAlign: "left", padding: 35}}>
                            <div id="org-loc" style={{ display: 'flex', alignItems: 'center', marginBottom: 15 }}>
                                <h4 style={{ marginBottom: 0, marginRight: 12}}>Location: </h4>
                                <p style={{ marginBottom: 0}}> {profileData.userLocation}</p>
                            </div>
                            <div id="org-bio">
                                <h4>Biography:</h4>
                                <p>{profileData.biography}</p>
                            </div>
                            <div id="org-exp">
                                <h4>Experience:</h4>
                                <p>{profileData.experience}</p>
                            </div>
                            <div id="org-contact">
                                <h4>{profileData.firstName} {profileData.lastName[profileData.lastName.length - 1] == 's' ? profileData.lastName + `'` : profileData.lastName + `'s`} Contacts:</h4>
                                <p>Email: {profileData.email}</p>
                            </div>
                        </div>
                    </div>
                </section>
        </>
    );
}