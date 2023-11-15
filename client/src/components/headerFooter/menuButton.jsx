import { Link } from "react-router-dom";
import Auth from '../../utilities/auth';
import ChatButton from "./chatButton";

import { useQuery, useMutation } from "@apollo/client";
import { QUERY_PROF_CHATS, QUERY_CHAT_ID } from "../../utilities/queries";
import { CREATE_MESSAGE } from "../../utilities/mutations";
import { useState, useEffect } from "react";
import ChatModal from "./chatModal";

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
                    <ChatModal data={data} handleChatInfo={handleChatInfo} handleChatInput={handleChatInput} currentChatInfo={currentChatInfo} openChatsCloseMessage={openChatsCloseMessage} closeChatsOpenMessage={closeChatsOpenMessage} Auth={Auth} setMessageText={setMessageText} messageText={messageText}/>
                </div>
            </>
        );
    }
}