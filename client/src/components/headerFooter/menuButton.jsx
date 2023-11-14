import { Link } from "react-router-dom";
import Auth from '../../utilities/auth';
import ChatButton from "./chatButton";

import { useQuery } from "@apollo/client";
import { QUERY_PROF_CHATS } from "../../utilities/queries";

export default function MenuButton({ isOrganisation }) {

    const { loading, data } = useQuery(QUERY_PROF_CHATS, {
        variables: { profileId: Auth.getProfile().data.userInfo._id }
    });

    if (!loading) {
        console.log(data);
        return (
            <>
                <button data-bs-toggle="modal" data-bs-target="#main-menu-modal" ><i className="bi bi-list"></i></button>
                <div className="modal fade" id="main-menu-modal" tabIndex="-1" role="dialog" aria-labelledby="main-menu-modalLabel" aria-hidden="true" style={{ marginTop: 100}}>
                    <div className="modal-dialog" role="document" style={{ marginRight: 0, marginTop: 0, width: 290}}>
                        <div className="modal-content" style={{ height: 600}}>
                            <div className="modal-header" style={{ display: 'flex', flexDirection: 'row-reverse'}}>
                                <h5 className="modal-title" id="main-menu-modalLabel" style={{ width: '100%'}}>Main menu</h5>
                                <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body" style={{ display: 'flex', flexDirection: 'column' }}>
                                <Link to={`/profile/${Auth.getProfile().data.userInfo._id}`}><button id="my-profile-button">My profile</button></Link>
                                <ChatButton />
                                {isOrganisation ? ( <button id="create-listing-button">Create listing</button> ) : ''}
                                <button id="logout-button" onClick={() => {event.preventDefault(), Auth.logout()}}>Logout</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal fade" id="chat-menu-modal" tabIndex="-1" role="dialog" aria-labelledby="chat-menu-modalLabel" aria-hidden="true" style={{ marginTop: 20}}>
                    <div className="modal-dialog" role="document">
                        <div className="modal-content" style={{ height: 600 }}>
                            <div className="modal-header" style={{ display: 'flex'}}>
                                <h5 className="modal-title" id="chat-menu-modalLabel">Chats</h5>
                                <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', height: 500 }}>
                                {data.profileById.userChats.map((chat) => {
                                    return (
                                        <>
                                            <div className="userchat-hold" style={{ display: 'flex' }}>
                                                <div className="chat-pfp-hold">
                                                    <img src={chat.employer[0].profilePicture} alt="Organisation Photo" width={60} height={60} style={{ borderRadius: 50 }} />
                                                </div>
                                                <div className="chat-desc-hold">
                                                    <h5>{chat.chatName}</h5>
                                                    <p>{chat.chatMessages[chat.chatMessages.length - 1].messageContent}</p>
                                                </div>
                                            </div>
                                        </>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}