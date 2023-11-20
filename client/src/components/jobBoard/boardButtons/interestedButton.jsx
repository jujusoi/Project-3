import { useQuery } from '@apollo/client';
import { QUERY_CHATS_PROF } from '../../../utilities/queries';

export default function InterestedButton({ handleNewChat, listing, profileId }) {

    const { loading, data } = useQuery(QUERY_CHATS_PROF, {
        variables: { profileId },
    });

    if (!loading) {
        if (data.chatByProfile.filter((array) => array.listedJob[0]._id === listing._id).length > 0) {
            return (
                <>
                    <button className="interested-btn" style={{ backgroundColor: '#5f5fff', marginRight: 10 }} disabled>Chat Active</button>
                </>
            );
        } else {
            return (
                <button className="interested-btn" style={{ backgroundColor: '#5f5fff', marginRight: 10 }} onClick={(event) => {handleNewChat(event, { listedJob: listing._id, employer: listing.poster[0]._id, mainUser: profileId }), event.target.textContent = 'Chat Active', event.target.disabled = true}} data-bs-toggle="modal" data-bs-target="#chat-menu-modal">Interested</button>
            )
        };
    }
}