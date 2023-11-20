import { useState, useEffect } from "react";

export default function ListingSearchBar({ setPageNumber, searchValues, handleSearchChange }) {
    return (
        <>
            <div style={{ width: '80%', textAlign: 'left', margin: 'auto', marginTop: 50, marginBottom: 50 }}>
                <div>
                    <h1>Listing query filter</h1>
                    <p>Refine your job search effortlessly with this advanced filter. Find the perfect match for your skills and preferences tailored by title, location, employment type, and industry.</p>
                </div>
                <div style={{ display: 'flex', justifyContent: "center", marginTop: 35 }}>
                    <form id="listing-search-form" onSubmit={(event) => { event.preventDefault(), setPageNumber(0) }} style={{ width: '100%', height: 70, marginBottom: 15 }} name="listing-search-form">
                        <input className="search-input" id="listing-li-input" style={{ padding: 25, width: '35%', height: '100%' }} type="text" placeholder="Listing title" name="title" onChange={(event) => { handleSearchChange(event.target, event.target.value), setPageNumber(0) }} value={searchValues.title} autoComplete="off" />
                        <input className="search-input" style={{ padding: 25, width: '21.6%', height: '100%' }} type="text" placeholder="Location" name="location" onChange={(event) => { handleSearchChange(event.target, event.target.value), setPageNumber(0) }} value={searchValues.location} autoComplete="off" />
                        <input className="search-input" style={{ padding: 25, width: '21.6%', height: '100%' }} type="text" placeholder="Employment type" name="jobType" onChange={(event) => { handleSearchChange(event.target, event.target.value), setPageNumber(0) }} value={searchValues.jobType} autoComplete="off" />
                        <input className="search-input" id="listing-ind-input" style={{ padding: 25, width: '21.6%', height: '100%' }} type="text" placeholder="Industry" name="industry" onChange={(event) => { handleSearchChange(event.target, event.target.value), setPageNumber(0) }} value={searchValues.industry} autoComplete="off" />
                    </form>
                </div>
            </div>
        </>
    );
}