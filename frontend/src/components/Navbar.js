import React from "react";
import "../styles/navBar.css";

/**
 * 
 * tabs: array of strings of tabs you want to display
 * setTab: useState function that will indicate in parent component which tab is selected.
 * Actual rendering of page content should be done in Homepage.js 
 */
export default function Navbar({ tabs, setTab, activeTab }) {
    return (
        <div className="navbar">
            {tabs.map((tab) => (
                <div className="nav-item" key={tab}>
                    <button
                        className={`nav-button ${tab === activeTab ? "active" : "inactive"}`}
                        onClick={() => setTab(tab)}
                    >
                        {tab}
                    </button>
                </div>
            ))}
        </div>
    );
}
