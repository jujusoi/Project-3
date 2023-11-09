import { Link } from "react-router-dom";

export default function Header() {
    return (
        <>
        <section>
            <div style={{display: "flex", width: '100%', justifyContent: 'space-evenly'}}>
                <div style={{width: '50%'}}>
                    <img style={{display: 'flex'}} src="https://preview.redd.it/af446nff4fq51.jpg?width=640&crop=smart&auto=webp&s=4f109ac392afe60a99674e6ebd1ff75df4719b5b" alt="logo" width={50} height={50}/>
                </div>
                <div style={{display: "flex", width: '50%', justifyContent: 'space-evenly'}}>
                    <div>
                    <button>Chats</button>
                    </div>
                    <div>
                    <Link to={'/'}><button>Job Listings</button></Link>
                    </div>
                    <div>
                    <Link to={'/auth-page'}><button>Login</button></Link>
                    </div>
                    <div>
                    <Link to={'/auth-page'}><button>Sign Up</button></Link>
                    </div>                                                                         
                </div>
            </div>
        </section>
    </>
    );
};