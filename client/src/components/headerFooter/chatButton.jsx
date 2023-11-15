

export default function ChatButton({ refetch }) {
    return (
        <>
            <button id="chat-button" data-bs-toggle="modal" data-bs-target="#chat-menu-modal" onClick={() => refetch()}>Chats</button>
        </>
    );
};