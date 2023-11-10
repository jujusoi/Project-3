import JobListings from "../components/jobBoard/jobListings";

export default function JobBoardPage() {
    return (
        <>
            <section id="listing-sect">
                <div id="listing-holder" style={{ width: '55%', margin: 'auto'}}>
                    <JobListings />
                </div>
            </section>
        </>
    );
};