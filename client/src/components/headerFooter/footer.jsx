import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <>
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