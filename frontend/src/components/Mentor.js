import React, { useEffect } from "react";
import "../styles/mentor.css";

export default function Mentor({ mentorId, name, about, onConnect, setModalOpen, setName, setDescription, setImg }) {

    const handleConnect = () => {
        onConnect(mentorId);
    };

    const handleAbout = () => {
        setName(name);
        setDescription(about);
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
