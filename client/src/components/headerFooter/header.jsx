import { Link } from "react-router-dom";
import Auth from '../../utilities/auth';

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
                    <button>Chats</button>
                    <Link to={'/'}><button>Job Listings</button></Link>
                    {isLoggedIn ? <button onClick={() => {event.preventDefault(), Auth.logout()}}>Logout</button> : <Link to={'/login'}><button>Login</button></Link> }
                    <Link to={'/auth-page'}><button>Sign Up</button></Link>
                </div>
            </div>
        </section>
    </>
    );
};