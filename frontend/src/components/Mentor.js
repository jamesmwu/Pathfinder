import React from "react";
import "../styles/mentor.css";

export default function Mentor({ mentorId, name, about, onConnect, setModalOpen }) {

    const handleConnect = () => {
        onConnect(mentorId);
    };

    const handleAbout = () => {
        setModalOpen(true);
    };

    return (
        <div className="mentor">
            <h2 className="mentor-name">{name}</h2>
            <p>{about}</p>
            <div className="mentorBtnContainer">
                <button className="about-button" onClick={handleAbout}>About</button>
                <button className="connect-button" onClick={handleConnect}>Connect</button>
            </div>
        </div>
    );
}
