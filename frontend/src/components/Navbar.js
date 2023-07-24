import React from "react";
import axios from "axios";
import "../styles/navBar.css";

/**
 * 
 * tabs: array of strings of tabs you want to display
 * setTab: useState function that will indicate in parent component which tab is selected.
 * Actual rendering of page content should be done in Homepage.js 
 */
export default function Navbar({ tabs, setTab, activeTab, currentSelectedConnection, socketRef, userId }) {
    const handleDisconnect = async () => {
        try {
            await axios.put(
                `${process.env.REACT_APP_BACKEND_URL}/api/users/${userId}/remove-connection`,
                { userId: currentSelectedConnection?.mentor?._id }
            ).then(async (response) => {
                socketRef.current.emit("process_new_connection", userId, currentSelectedConnection?.mentor?._id);
                // console.log(response.data);
            });
        } catch (error) {
            console.log(error);
        }
    };

    function MentorName() {
        if (activeTab === "Chats" && currentSelectedConnection?.mentor?.username) {
            return (
                <div className="mentorName">
                    <button className="mentorButton" onClick={handleDisconnect}>Disconnect</button>
                    <h2>{currentSelectedConnection?.mentor?.username}</h2>
                </div>
            );
        }
    }

    return (
        <div className="navContainer">
            <div className="navbar">
                {tabs.map((tab) => (
                    <div className="nav-item" key={tab}>
                        <button
                            className={tab === activeTab ? "active" : "inactive"}
                            onClick={() => setTab(tab)}
                        >
                            {tab}
                        </button>
                    </div>
                ))}
            </div>
            <MentorName />
        </div>
    );
}
