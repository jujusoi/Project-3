import { useMutation, useQuery } from "@apollo/client";
import { SAVE_LISTING } from "../../../utilities/mutations";
import { QUERY_PROF_SAVES } from "../../../utilities/queries";

export default function SaveListingButton({ listingId, profileId }) {


    const [updateSavedListing, { error }] = useMutation(SAVE_LISTING);

    const { loading, data } = useQuery(QUERY_PROF_SAVES, {
        variables: { profileId }
    });

    const handleSave = async (event) => {
        event.preventDefault();
        try {
            const { data } = await updateSavedListing({
                variables: { listingId, profileId },
            });
            if (data) {
                event.target.className == 'save-listing-btn bi bi-bookmarks-fill' ? event.target.className = 'save-listing-btn bi bi-bookmarks' : event.target.className = 'save-listing-btn bi bi-bookmarks-fill';
            }
        } catch {
            console.error(error);
        }
    };

    if (!loading) {
        if (data.profileById.savedListings.filter((listing) => listing._id == listingId).length > 0) {
            return (
                <>
                    <button type='button' onClick={() => handleSave(event)} className="save-listing-btn bi bi-bookmarks-fill"></button>
                </>
            )
        } else {
            return (
                <>
                    <button type='button' onClick={() => handleSave(event)} className="save-listing-btn bi bi-bookmarks"></button>
                </>
            );
        };
    };
};