import JobListings from "../components/jobBoard/jobListings";
import ListingSearchBar from "../components/jobBoard/listingSearch";

export default function JobBoardPage() {
    return (
        <>
            <section id="searchbar-sect">
                <ListingSearchBar />
            </section>
            <section id="listing-sect" style={{ backgroundColor: '#b2a7a79c', width: '80%', margin: 'auto' }}>
                <div id="listing-holder" style={{ width: '100%', margin: 'auto', padding: 25}}>
                    <JobListings />
                </div>
            </section>
        </>
    );
};