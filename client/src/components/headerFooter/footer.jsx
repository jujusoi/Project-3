import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <>
               <section style={{ width: '100%'}}>
            <div style={{ height: 200, backgroundColor: 'rgb(135 165 195)'}}>
                <div className="hf-wrapimg" style={{ height: '100%', width: '100%', backgroundImage: 'url(https://meetsalmela.com/polelid/2023/05/25334026_resume_01-1-1024x578.jpg)', backgroundSize: 'cover', filter: 'blur(2.5px) opacity(.5)', boxShadow: 'rgba(0, 0, 0, 0.25) 0px 0px 15px 4px inset', backgroundAttachment: 'fixed'}}></div>
            </div>
        </section>
        <section>
            <div style={{display: "flex", width: '100%', justifyContent: 'space-evenly'}}>
                <div style={{display: "flex", flexDirection:'column', justifyContent: 'space-evenly'}}>
                    <Link to={'/about'}><p style={{ marginTop: 0}}>About</p></Link>
                    <Link to={'/donate'}><p style={{ marginTop: 0}}>Donate</p></Link>
                    <Link to={'/contact'}><p style={{ marginTop: 0}}>Contact Us</p></Link>
                </div>
            </div>
        </section>
 
    </>
    );
};