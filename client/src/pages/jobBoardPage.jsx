import JobListings from "../components/jobBoard/jobListings";
import ListingSearchBar from "../components/jobBoard/listingSearch";

import { useState, useEffect } from "react";
import Auth from '../utilities/auth';

export default function JobBoardPage() {

    const [pageNumber, setPageNumber] = useState(0);
    const [searchValues, setSearchValues] = useState({
        title: '',
        location: '',
        industry: '',
        jobType: '',
    });

    const handleSearchChange = (target, value) => {
        setSearchValues(previousSearchValues => ({
            ...previousSearchValues,
            [target.name]: value,
        }));
    };

    useEffect(() => {
        if (window.localStorage.getItem('token')) {
            const tokenInfo = Auth.getProfile().data.userInfo;
            setSearchValues(previousSearchValues => ({
                ...previousSearchValues,
                location: tokenInfo.userLocation,
                industry: tokenInfo.industry,
            }));
        };
    }, []);

    useEffect(() => {
        pageNumber <= 0 ? document.querySelector('#decrease-page').disabled = true : document.querySelector('#decrease-page').disabled = false;
    }, [pageNumber]);

    return (
        <>
            <section id="searchbar-sect">
                <ListingSearchBar setPageNumber={setPageNumber} searchValues={searchValues} handleSearchChange={handleSearchChange} />
            </section>
            <section id="listing-sect" style={{ backgroundColor: 'rgb(239, 239, 245)', margin: 'auto', marginBottom: 25, padding: 25, boxShadow: 'rgba(0, 0, 0, .15) 0px 10px 12px 0px inset' }}>
                <div id="listing-holder" style={{ width: '85%', margin: 'auto', padding: 25}}>
                    <JobListings pageNumber={pageNumber} searchValues={searchValues} />
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