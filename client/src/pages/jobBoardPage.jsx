import JobListings from "../components/jobBoard/jobListings";
import ListingSearchBar from "../components/jobBoard/listingSearch";

export default function JobBoardPage() {
    return (
        <>
            <section id="listing-sect">
                    <ListingSearchBar />
                <div id="listing-holder" style={{ width: '55%', margin: 'auto'}}>
                    <JobListings />
                </div>
            </section>
        </>
    );
};