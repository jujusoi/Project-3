
import { useMutation } from "@apollo/client";
import { DELETE_CHAT } from "../../utilities/mutations";
import { Link } from "react-router-dom";

export default function ChatModal({ data, handleChatInfo, handleChatInput, currentChatInfo, openChatsCloseMessage, closeChatsOpenMessage, Auth, setMessageText, messageText}) {

    const [ deleteChat, { error }] = useMutation(DELETE_CHAT);

    const handleChatDelete = async (event, chatId) => {
        event.preventDefault();
        try {
            const { data } = deleteChat({
                variables: { chatId },
            });
            event.target.disabled = true;
            const chatDeletedDiv = event.target.parentElement.parentElement;
            chatDeletedDiv.style.opacity = 0;
            setTimeout(() => {
                chatDeletedDiv.remove();
            }, 600);
        } catch (err) {
            console.error(err);
        };
    };

    return (
        <>
            
            <div className="modal-dialog" role="document">
                        <div className="modal-content" style={{ height: 600 }}>
                            <div className="modal-header" style={{ display: 'flex' }}>
                                <h5 className="modal-title" id="chat-menu-modalLabel">Chats</h5>
                                <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', height: 500 }}>
                                <div id="main-chat-holder" style={{ display: 'flex', flexDirection: 'column', overflowY: 'scroll' }}>
                                    {data.profileById.userChats.map((chat) => {
                                        return (
                                            <>
                                                <div className="userchat-hold" key={chat._id} style={{ display: 'flex', marginBottom: 25, alignItems: 'center' }}>
                                                    <div className="chat-pfp-hold">
                                                        <Link to={`/profile/${Auth.getProfile().data.userInfo._id == chat.employer[0]._id ? chat.mainUser[0]._id : chat.employer[0]._id}`}><img src={Auth.getProfile().data.userInfo._id == chat.employer[0]._id ? chat.mainUser[0].profilePicture : chat.employer[0].profilePicture} alt="Organisation Photo" width={60} height={60} style={{ borderRadius: 50 }} /></Link>
                                                    </div>
                                                    <div className="chat-desc-hold" onClick={(event) => {handleChatInfo(chat._id), closeChatsOpenMessage()}}>
                                                        <p style={{ marginBottom: 0 }}><b>Chat for {chat.listedJob[0].title} at {chat.employer[0].orgName}</b></p>
                                                        <p style={{ marginBottom: 0 }}>{chat.chatMessages.length > 0 ? chat.chatMessages[chat.chatMessages.length - 1].messageContent.slice(0, 25) + '...' : ''}</p>
                                                    </div>
                                                    <div className="chat-delete-btn" style={{ height: '100%'}}>
                                                        <button type="button" className="bi bi-trash" style={{ height: 75, backgroundColor: '#cd4747' }} onClick={(event) => handleChatDelete(event, chat._id)}></button>
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
                                            <button type='button' onClick={() => openChatsCloseMessage()}><i className="bi bi-arrow-return-left"></i></button>
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
        </>
    );
};