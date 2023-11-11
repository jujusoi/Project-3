import { useQuery } from "@apollo/client";
import { QUERY_LISTING_BY_ID } from "../utilities/queries";
import { useParams } from "react-router-dom";

export default function ListingPage() {

    const listingId = useParams().listingId;

    const { loading, data } = useQuery(QUERY_LISTING_BY_ID, {
        variables: { listingId: listingId }
    });

    console.log(data);
    
    return (
        <>
            <h2>Individual listing page</h2>
        </>
    );
};