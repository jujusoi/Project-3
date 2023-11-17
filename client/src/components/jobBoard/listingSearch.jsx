import { useState, useEffect } from "react";
let lastElement;
let lastContent;
let lastElement1;
let lastContent1;

export default function ListingSearchBar({ setPageNumber, searchValues, handleSearchChange }) {
    return (
        <>
            <div style={{ width: '80%', textAlign: 'left', margin: 'auto', marginTop: 35 }}>
                <div>
                    <h1>Listing query filter</h1>
                    <p>Refine your job search effortlessly with this advanced filter. Find the perfect match for your skills and preferences tailored by title, location, employment type, and industry.</p>
                </div>
                <div style={{ display: 'flex', justifyContent: "center", marginTop: 35 }}>
                    <form onSubmit={(event) => { event.preventDefault(), setPageNumber(0) }} style={{ width: '100%', height: 70, marginBottom: 15 }} action="submit" name="listing-search-form">
                        <input id="listing-li-input" style={{ padding: 25, width: '30%', height: '100%' }} type="text" placeholder="Listing title" name="title" required onChange={(event) => { handleSearchChange(event.target, event.target.value), setPageNumber(0) }} value={searchValues.title} />
                        <input style={{ padding: 25, width: '25%', height: '100%' }} type="text" placeholder="Location" name="location" required onChange={(event) => { handleSearchChange(event.target, event.target.value), setPageNumber(0) }} value={searchValues.location} />
                        <input style={{ padding: 25, width: '25%', height: '100%' }} type="text" placeholder="Employment type" name="jobType" required onChange={(event) => { handleSearchChange(event.target, event.target.value), setPageNumber(0) }} value={searchValues.jobType} />
                        <input style={{ padding: 25, width: '20%', height: '100%' }} type="text" placeholder="Industry" name="industry" required onChange={(event) => { handleSearchChange(event.target, event.target.value), setPageNumber(0) }} value={searchValues.industry} />
                    </form>
                </div>
            </div>
        </>
    );
}