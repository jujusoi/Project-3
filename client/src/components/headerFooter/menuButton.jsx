import { Link } from "react-router-dom";
import Auth from '../../utilities/auth';
import ChatButton from "./chatButton";

import { useQuery } from "@apollo/client";
import { QUERY_PROF_CHATS, QUERY_CHAT_ID } from "../../utilities/queries";
import { useState, useEffect } from "react";

export default function MenuButton({ isOrganisation }) {

    const [currentChatInfo, setCurrentChatInfo] = useState({})

    const { loading, data } = useQuery(QUERY_PROF_CHATS, {
        variables: { profileId: Auth.getProfile().data.userInfo._id }
    });

    const handleChatInfo = (chatId) => {
        setCurrentChatInfo(...(data.profileById.userChats.filter((chat) => chat._id == chatId)))
    };

    useEffect(() => {
        console.log(currentChatInfo);
    }, [currentChatInfo]);

    const closeChatsOpenMessage = () => {
        document.querySelector('#current-chat-holder').style.display = 'flex';
        document.querySelector('#main-chat-holder').style.opacity = '0';
        setTimeout(() => {
            document.querySelector('#main-chat-holder').style.display = 'none';
            document.querySelector('#current-chat-holder').style.opacity = 1;
        }, 1000);
    };
    
    const openChatsCloseMessage = () => {
        document.querySelector('#current-chat-holder').style.opacity = '0';
        setTimeout(() => {
            document.querySelector('#main-chat-holder').style.display = 'flex';
            document.querySelector('#current-chat-holder').style.display = 'none';
            setTimeout(() => {
                document.querySelector('#main-chat-holder').style.opacity = 1;
            }, 300);
        }, 1000);
    };

    if (!loading) {
        console.log(data);
        return (
            <>
                <button data-bs-toggle="modal" data-bs-target="#main-menu-modal" ><i className="bi bi-list"></i></button>
                <div className="modal fade" id="main-menu-modal" tabIndex="-1" role="dialog" aria-labelledby="main-menu-modalLabel" aria-hidden="true" style={{ marginTop: 100 }}>
                    <div className="modal-dialog" role="document" style={{ marginRight: 0, marginTop: 0, width: 290 }}>
                        <div className="modal-content" style={{ height: 600 }}>
                            <div className="modal-header" style={{ display: 'flex', flexDirection: 'row-reverse' }}>
                                <h5 className="modal-title" id="main-menu-modalLabel" style={{ width: '100%' }}>Main menu</h5>
                                <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body" style={{ display: 'flex', flexDirection: 'column' }}>
                                <Link to={`/profile/${Auth.getProfile().data.userInfo._id}`}><button id="my-profile-button">My profile</button></Link>
                                <ChatButton />
                                {isOrganisation ? (<button id="create-listing-button">Create listing</button>) : ''}
                                <button id="logout-button" onClick={() => { event.preventDefault(), Auth.logout() }}>Logout</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal fade" id="chat-menu-modal" tabIndex="-1" role="dialog" aria-labelledby="chat-menu-modalLabel" aria-hidden="true" style={{ marginTop: 20 }}>
                    <div className="modal-dialog" role="document">
                        <div className="modal-content" style={{ height: 600 }}>
                            <div className="modal-header" style={{ display: 'flex' }}>
                                <h5 className="modal-title" id="chat-menu-modalLabel">Chats</h5>
                                <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', height: 500 }}>
                                <div id="main-chat-holder" style={{ display: 'flex', flexDirection: 'column' }}>
                                    {data.profileById.userChats.map((chat) => {
                                        return (
                                            <>
                                                <div className="userchat-hold" key={chat._id} data_id={chat._id} onClick={(event) => {handleChatInfo(event.currentTarget.getAttribute("data_id")), closeChatsOpenMessage()}} style={{ display: 'flex' }}>
                                                    <div className="chat-pfp-hold">
                                                        <img src={chat.employer[0].profilePicture} alt="Organisation Photo" width={60} height={60} style={{ borderRadius: 50 }} />
                                                    </div>
                                                    <div className="chat-desc-hold">
                                                        <p><b>Chat for {chat.listedJob[0].title} at {chat.employer[0].orgName}</b></p>
                                                        <p>{chat.chatMessages.length > 0 ? chat.chatMessages[chat.chatMessages.length - 1].messageContent : ''}</p>
                                                    </div>
                                                </div>
                                            </>
                                        );
                                    })}
                                </div>
                                <div id="current-chat-holder" style={{ overflowY: 'scroll', display: 'none', flexDirection: 'column', opacity: 0 }}>
                                    {Object.keys(currentChatInfo).length > 0 ? (<>
                                        <div id="chat-tne" style={{ display: 'flex', flexDirection: 'row-reverse', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <div>
                                                <p style={{ width: '100%' }}><b>Chat between {currentChatInfo.mainUser[0].firstName} {currentChatInfo.mainUser[0].lastName} and {currentChatInfo.employer[0].orgName}</b></p>
                                                <p>For {currentChatInfo.listedJob[0].jobType} {currentChatInfo.listedJob[0].title}</p>
                                            </div>
                                            <button type='button' onClick={() => openChatsCloseMessage()}><i class="bi bi-arrow-return-left"></i></button>
                                        </div>
                                        <div id="chat-mni">
                                            <div id="chats-hold">
                                                {currentChatInfo.chatMessages.map((message) => {
                                                    return (
                                                        <>
                                                        <div className="message" style={{ display: 'flex', flexDirection: Auth.getProfile().data.userInfo.isOrganisation && message.username == currentChatInfo.mainUser[0].firstName || Auth.getProfile().data.userInfo.isOrganisation === false && message.username == currentChatInfo.employer[0].orgName ? 'row' : 'row-reverse' }}>
                                                            <div className="message-img">
                                                                <img src={message.username == currentChatInfo.mainUser[0].firstName ? currentChatInfo.mainUser[0].profilePicture : currentChatInfo.employer[0].profilePicture} width={50} height={50} style={{ borderRadius: 50 }} alt="pfp" />
                                                            </div>
                                                            <div className="message-nnu">
                                                                <p style={{ fontSize: 13}}>{message.username}</p>
                                                                <p>{message.messageContent}</p>
                                                            </div>
                                                        </div>
                                                        </>
                                                    );
                                                })}
                                            </div>
                                            <div id="chat-input-hold">
                                                <form action="submit" onSubmit={(event) => event.preventDefault()}>
                                                    <input type="text" name="messageContent" id="message-input" placeholder="Your message..." />
                                                    <button type='button' className="bi bi-send"></button>
                                                </form>
                                            </div>
                                        </div>
                                    </>) : ''}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}