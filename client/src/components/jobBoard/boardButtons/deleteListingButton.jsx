
import { useMutation } from "@apollo/client";
import { DELETE_LISTING } from "../../../utilities/mutations";

export default function DeleteListing({ listingId, profileId }) {

    const [deleteListing, { error }] = useMutation(DELETE_LISTING);

    const handleListingDelete = async (event, listingId) => {
        event.preventDefault();
        try {
            const { data } = await deleteListing({
                variables: { listingId },
            });
            if (data) {
                window.location.assign(`/profile/${profileId}`);
            };
        } catch (err) {
            console.error(err);
        };
    };

    return (
        <button className="bi bi-trash3" onClick={(event) => handleListingDelete(event, listingId)} style={{ backgroundColor: '#cd4747' }}></button>
    );
}