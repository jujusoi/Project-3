
import { Link } from "react-router-dom";

export default function ChatButton({ refetch }) {
    return (
        <>
            <Link style={{ paddingLeft: 20, borderLeft: '3px solid rgba(0, 0, 0, 0.08)' }} id="chat-button" data-bs-toggle="modal" data-bs-target="#chat-menu-modal" onClick={() => refetch()}>
                <p style={{ fontSize: 18, margin: 'auto', marginRight: 75 }} className="listing-not linkanchor">My Chats</p>
            </Link>
            <Link>
                <i style={{ fontSize: 26, color: '#032075' }} data-bs-toggle="modal" data-bs-target="#chat-menu-modal" onClick={() => refetch()} className="bi bi-box-arrow-in-up-right linkanchor"></i>
            </Link>
        </>
    );
};