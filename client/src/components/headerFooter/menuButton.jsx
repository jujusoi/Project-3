import { Link } from "react-router-dom";
import Auth from '../../utilities/auth';

export default function MenuButton() {

    return (
        <>
            <button data-bs-toggle="modal" data-bs-target="#exampleModal" ><i className="bi bi-list"></i></button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{ marginTop: 100}}>
                <div className="modal-dialog" role="document" style={{ marginRight: 0, marginTop: 0, width: 290}}>
                    <div className="modal-content" style={{ height: 600}}>
                        <div className="modal-header" style={{ display: 'flex', flexDirection: 'row-reverse'}}>
                            <h5 className="modal-title" id="exampleModalLabel" style={{ width: '100%'}}>Main menu</h5>
                            <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body" style={{ display: 'flex', flexDirection: 'column' }}>
                            <Link to={`/profile/${Auth.getProfile().data.userInfo._id}`}><button>My profile</button></Link>
                            <button onClick={() => {event.preventDefault(), Auth.logout()}}>Logout</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}