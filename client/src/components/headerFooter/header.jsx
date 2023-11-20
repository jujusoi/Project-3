import { Link } from "react-router-dom";
import Auth from '../../utilities/auth';
import MenuButton from "./menuButton";

export default function Header() {

    let isLoggedIn;
    if (Auth.getToken()) {
        isLoggedIn = true;
    }

    return (
        <>
        <section id="header-sect">
            <div style={{display: "flex", width: '100%', justifyContent: 'space-evenly', height: 120, alignItems: 'center'}}>
                <div style={{width: '70%'}}>
                    <img style={{display: 'flex'}} src="https://preview.redd.it/af446nff4fq51.jpg?width=640&crop=smart&auto=webp&s=4f109ac392afe60a99674e6ebd1ff75df4719b5b" alt="logo" width={50} height={50}/>
                </div>
                <div style={{display: "flex", width: '30%', justifyContent: 'space-evenly'}}>
                    <Link to={'/'}><button>Job Listings</button></Link>
                    {isLoggedIn ? '' : <Link to={'/login'}><button>Login</button></Link> }
                    {isLoggedIn ? (<MenuButton isOrganisation={Auth.getProfile().data.userInfo.isOrganisation} />): <Link to={'/create-account'}><button>Sign Up</button></Link>}
                </div>
            </div>
        </section>
        <section style={{ width: '100%'}}>
            <div style={{ height: 300, backgroundColor: 'rgb(135 165 195)'}}>
                <div className="hf-wrapimg" style={{ height: '100%', width: '100%', backgroundImage: 'url(https://meetsalmela.com/polelid/2023/05/25334026_resume_01-1-1024x578.jpg)', backgroundSize: 'cover', filter: 'blur(2.5px) opacity(.5)', boxShadow: 'rgba(0, 0, 0, 0.25) 0px 0px 15px 4px inset', backgroundAttachment: 'fixed'}}></div>
            </div>
        </section>
    </>
    );
};