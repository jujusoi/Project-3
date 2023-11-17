import JobListings from "../components/jobBoard/jobListings";
import ListingSearchBar from "../components/jobBoard/listingSearch";

import { useState, useEffect } from "react";

export default function JobBoardPage() {

    const [pageNumber, setPageNumber] = useState(0);

    useEffect(() => {
        pageNumber <= 0 ? document.querySelector('#decrease-page').disabled = true : document.querySelector('#decrease-page').disabled = false;
    }, [pageNumber]);

    return (
        <>
            <section id="searchbar-sect">
                <ListingSearchBar />
            </section>
            <section id="listing-sect" style={{ backgroundColor: '#b2a7a79c', width: '80%', margin: 'auto' }}>
                <div id="listing-holder" style={{ width: '100%', margin: 'auto', padding: 25}}>
                    <JobListings pageNumber={pageNumber} />
                </div>
            </section>
            <section id="page-sect">
                <div style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', margin: 'auto', width: '30%'}}>
                    <button id="decrease-page" onClick={(event) => {setPageNumber(pageNumber - 1), event.target.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" })}} className="bi bi-arrow-left" ></button>
                    <p>Page <span id="page-num">{pageNumber == 0 ? '1' : pageNumber + 1}</span></p>
                    <button id="increase-page" onClick={(event) => {setPageNumber(pageNumber + 1), document.querySelector("#searchbar-sect").scrollIntoView({ behavior: "instant", block: "center", inline: "nearest" })}} className="bi bi-arrow-right"></button>
                </div>
            </section>
        </>
    );
};