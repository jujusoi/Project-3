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
        <section>
            <div style={{display: "flex", width: '100%', justifyContent: 'space-evenly'}}>
                <div style={{width: '50%'}}>
                    <img style={{display: 'flex'}} src="https://preview.redd.it/af446nff4fq51.jpg?width=640&crop=smart&auto=webp&s=4f109ac392afe60a99674e6ebd1ff75df4719b5b" alt="logo" width={50} height={50}/>
                </div>
                <div style={{display: "flex", width: '50%', justifyContent: 'space-evenly'}}>
                    <Link to={'/'}><button>Job Listings</button></Link>
                    {isLoggedIn ? '' : <Link to={'/login'}><button>Login</button></Link> }
                    {isLoggedIn ? (<MenuButton />): <Link to={'/create-account'}><button>Sign Up</button></Link>}
                </div>
            </div>
        </section>
    </>
    );
};