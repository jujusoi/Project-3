import { Link } from "react-router-dom";
import Auth from '../../utilities/auth';
import ChatButton from "./chatButton";

import { useQuery, useMutation } from "@apollo/client";
import { QUERY_PROF_CHATS, QUERY_CHAT_ID } from "../../utilities/queries";
import { CREATE_MESSAGE } from "../../utilities/mutations";
import { useState, useEffect } from "react";

export default function MenuButton({ isOrganisation }) {

    const [currentChatInfo, setCurrentChatInfo] = useState({});
    const [messageText, setMessageText] = useState('');

    const options = { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' };
    setInterval(() => {
        
    }, 2000);
    const { loading, data, refetch } = useQuery(QUERY_PROF_CHATS, {
        variables: { profileId: Auth.getProfile().data.userInfo._id }
    });
    const [ createMessage, { error }] = useMutation(CREATE_MESSAGE);

    const handleChatInput = async (event, chatId, messageInfo) => {
        event.preventDefault();
        try {
            const { data } = await createMessage({
                variables: { messageInfo, chatId },
            });
            if (data) {
                console.log(data);
                setMessageText('');
                let newArray = [...currentChatInfo.chatMessages, { ...messageInfo, timeSent: new Date().toLocaleDateString('en-US', options)}];
                setCurrentChatInfo(previousChatInfo => ({
                    ...previousChatInfo,
                    chatMessages: newArray,
                }));
                refetch();
                scrollIntoMessage();
            }
        } catch (err) {
            console.error(err);
        };
    };

    const handleChatInfo = (chatId) => {
        setCurrentChatInfo(...(data.profileById.userChats.filter((chat) => chat._id == chatId)))
    };

    useEffect(() => {
        console.log(data);
    }, [data]);

    const scrollIntoMessage = () => {
        setTimeout(() => {
            const allMessages = document.getElementsByClassName('message');
            if (allMessages.length > 0) {
                allMessages[allMessages.length - 1].scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
            }; 
        }, 50);
    }

    const closeChatsOpenMessage = () => {
        document.querySelector('#current-chat-holder').style.display = 'flex';
        document.querySelector('#main-chat-holder').style.opacity = '0';
        setTimeout(() => {
            document.querySelector('#main-chat-holder').style.display = 'none';
            document.querySelector('#current-chat-holder').style.opacity = 1;
            scrollIntoMessage();
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
                                <div id="current-chat-holder" style={{ display: 'none', flexDirection: 'column', opacity: 0, height: '100%' }}>
                                    {Object.keys(currentChatInfo).length > 0 ? (<>
                                        <div id="chat-tne" style={{ display: 'flex', flexDirection: 'row-reverse', justifyContent: 'space-between', alignItems: 'flex-start', height: '20%' }}>
                                            <div>
                                                <p style={{ width: '100%' }}><b>Chat between {currentChatInfo.mainUser[0].firstName} {currentChatInfo.mainUser[0].lastName} and {currentChatInfo.employer[0].orgName}</b></p>
                                                <p>For {currentChatInfo.listedJob[0].jobType} {currentChatInfo.listedJob[0].title}</p>
                                            </div>
                                            <button type='button' onClick={() => openChatsCloseMessage()}><i class="bi bi-arrow-return-left"></i></button>
                                        </div>
                                        <div id="chat-mni" style={{ height: '65%'}}>
                                            <div id="chats-hold" style={{ overflowY: 'scroll', height: '100%', padding: 20 }}>
                                                {currentChatInfo.chatMessages.map((message) => {
                                                    return (
                                                        <>
                                                        <div className="message" style={{ display: 'flex', flexDirection: Auth.getProfile().data.userInfo.isOrganisation && message.username == currentChatInfo.mainUser[0].firstName || Auth.getProfile().data.userInfo.isOrganisation === false && message.username == currentChatInfo.employer[0].orgName ? 'row' : 'row-reverse' }}>
                                                            <div className="message-img">
                                                                <img src={message.username == currentChatInfo.mainUser[0].firstName ? currentChatInfo.mainUser[0].profilePicture : currentChatInfo.employer[0].profilePicture} width={50} height={50} style={{ borderRadius: 50, marginRight: 10, marginLeft: 10 }} alt="pfp" />
                                                            </div>
                                                            <div className="message-nnu" style={{ width: '70%', textAlign: Auth.getProfile().data.userInfo.isOrganisation && message.username == currentChatInfo.mainUser[0].firstName || Auth.getProfile().data.userInfo.isOrganisation === false && message.username == currentChatInfo.employer[0].orgName ? 'left' : 'right'}}>
                                                                <div style={{ display: 'flex', flexDirection: 'column-reverse', justifyContent: 'space-evenly'}}>
                                                                    <p style={{ fontSize: 13, marginBottom: 0}}><b>{message.username}</b></p>
                                                                    <p style={{ fontSize: 13, marginBottom: 0}}>{message.timeSent}</p>
                                                                </div>
                                                                <p>{message.messageContent}</p>
                                                            </div>
                                                        </div>
                                                        </>
                                                    );
                                                })}
                                            </div>
                                            <div id="chat-input-hold" style={{ marginTop: 15, height: '15%'}}>
                                                <form action="submit" onSubmit={() => handleChatInput(event, currentChatInfo._id, { messageContent: messageText, username: Auth.getProfile().data.userInfo.isOrganisation ? currentChatInfo.employer[0].orgName : currentChatInfo.mainUser[0].firstName})} style={{ display: 'flex'}}>
                                                    <input type="text" name="messageContent" id="message-input" placeholder="Your message..." style={{ width: '90%', borderTopLeftRadius: 15, borderBottomLeftRadius: 15, padding: 10}} onChange={(event) => setMessageText(event.currentTarget.value)} value={messageText} />
                                                    <button type='submit' className="bi bi-send" style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0}}></button>
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