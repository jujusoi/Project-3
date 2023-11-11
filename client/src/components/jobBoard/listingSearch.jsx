import { useState, useEffect } from "react";
let lastElement;
let lastContent;
let lastElement1;
let lastContent1;

export default function ListingSearchBar() {

    const industries = ["Farming", "Retail", "Fast Food"];
    const jobTypes = ["Casual", "Part Time", "Full Time"];

    const [searchFilter, setSearchFilter] = useState([]);

    const clickIndustry = (element, content) => {
        if (element.classList.contains('from-industry')) {
            if (searchFilter[0] == content) {
                setSearchFilter([undefined, searchFilter[1]]);
                element.textContent = content
            } else {
                if (lastElement !== undefined && lastContent !== undefined) {
                    lastElement.textContent = lastContent;
                    console.log(lastElement);
                }
                lastElement = element;
                lastContent = content;
                setSearchFilter([content, searchFilter[1]]);
                element.textContent = content + ' ✔️';
            }
        } else {
            if (searchFilter[1] == content) {
                setSearchFilter([searchFilter[0], undefined]);
                element.textContent = content
            } else {
                if (lastElement1 !== undefined && lastContent1 !== undefined) {
                    lastElement1.textContent = lastContent1;
                    console.log(lastElement1);
                }
                lastElement1 = element;
                lastContent1 = content;
                setSearchFilter([searchFilter[0], content]);
                element.textContent = content + ' ✔️'
            }
        };
    }

    useEffect(() => {
        if (searchFilter.length == 0 || searchFilter[0] == undefined && searchFilter[1] == undefined) {
            document.querySelector('#filter-button').textContent = 'Filter'
        } else if (searchFilter[0] !== undefined && searchFilter[1] !== undefined) {
            document.querySelector('#filter-button').textContent = `${searchFilter[0]} - ${searchFilter[1]}`
        } else if (searchFilter[0] !== undefined) {
            document.querySelector('#filter-button').textContent = searchFilter[0]
        } else if  (searchFilter[1] !== undefined) {
            document.querySelector('#filter-button').textContent = searchFilter[1]
        }
        console.log(searchFilter);
    }, [searchFilter]);

    return (
        <>
            <div style={{ display: 'flex', justifyContent: "center", width: '100%', marginTop: 35 }}>
                <form style={{ width: '80%', height: 70, marginBottom: 15 }} action="submit" name="listing-search-form">
                    <input id="listing-li-input" style={{ padding: 25, width: '40%', height: '100%', borderTopLeftRadius: 25, borderBottomLeftRadius: 25, borderRadius: 25 }} type="text" placeholder="Search for listings..." name="listing-search-val" required />
                    <input style={{ padding: 25, width: '20%', height: '100%' }} type="text" placeholder="Location" name="min-sal-val" required />
                    <button style={{ width: '28%', height: '100%', borderRadius: 0 }} className="btn btnB dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" id="filter-button">Filter</button>
                <ul className="dropdown-menu" id="dropdown-search" onClick={() => event.stopPropagation()}>
                    <li className="dropdown-item" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">Industry</li>
                    {industries.map((industry) => {
                        return (
                            <>
                                <li className="collapse from-industry" id="collapseExample"  type="button" onClick={() => clickIndustry(event.target, industry)}>{industry}</li>
                            </>
                        );
                    })}
                    <li className="dropdown-item" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample1" aria-expanded="false" aria-controls="collapseExample1">Job Type</li>
                    {jobTypes.map((type) => {
                        return (
                            <>
                                <li className="collapse from-jtype" id="collapseExample1"  type="button" onClick={() => clickIndustry(event.target, type)}>{type}</li>
                            </>
                        );
                    })}
                </ul>
                    <button id="listing-submit" style={{ width: '12%', height: '100%', borderRadius: 25}}>🔎</button>
                </form>
            </div>
        </>
    );
}