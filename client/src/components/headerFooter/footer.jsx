import { Link } from "react-router-dom";
import { useState } from "react";

export default function Footer() {

    const [hovered, setHovered] = useState('');

    return (
        <>
            <section style={{ width: '100%' }}>
                <div style={{ height: 200, backgroundColor: 'rgb(135 165 195)' }}>
                    <div className="hf-wrapimg" style={{ height: '100%', width: '100%', backgroundImage: 'url(https://meetsalmela.com/polelid/2023/05/25334026_resume_01-1-1024x578.jpg)', backgroundSize: 'cover', filter: 'blur(2.5px) opacity(.5)', boxShadow: 'rgba(0, 0, 0, 0.25) 0px 0px 15px 4px inset', backgroundAttachment: 'fixed' }}></div>
                </div>
            </section>
            <section>
                <div style={{ display: "flex", width: '100%', justifyContent: 'space-evenly', height: 130, padding: '30px 0px' }}>
                    <div style={{ display: "flex", justifyContent: 'space-between', width: '75%', alignItems: 'center' }}>
                        <div style={{ textAlign: 'left', marginRight: 25}}>
                            <p style={{ marginBottom: 0}} className="listing-not">Developed by James McDonald,</p>
                            <p className="listing-not"> © 2023</p>
                        </div>
                        <div style={{ display: 'flex' }}>
                            <Link to={'https://github.com/jujusoi'} target="_blank">
                                <img onMouseEnter={() => setHovered('gh')} className="href-images" style={{ marginRight: 15, filter: hovered == 'gh' ? 'drop-shadow(0px 0px 5px gray)' : 'none'}} width={60} src="https://cdn-icons-png.flaticon.com/512/25/25231.png" alt="my github" />
                            </Link>
                            <Link to={'https://stackoverflow.com/users/22805059/jujusoi'} target="_blank">
                                <img onMouseEnter={() => setHovered('so')} className="href-images" style={{ marginRight: 15, filter: hovered == 'so' ? 'drop-shadow(0px 0px 5px gray)' : 'none'}} width={60} src="https://static-00.iconduck.com/assets.00/stack-overflow-icon-2048x2048-7ohycn5z.png" alt="my stackof" />
                            </Link>
                            <Link to={'https://www.linkedin.com/in/james-mcdonald-20b20b299/'} target="_blank" >
                                <img onMouseEnter={() => setHovered('li')} className="href-images" width={60} src="https://static-00.iconduck.com/assets.00/linkedin-icon-2048x2048-ya5g47j2.png" style={{ filter: hovered == 'li' ? 'drop-shadow(0px 0px 5px gray)' : 'none'}} alt="my linkedin" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};