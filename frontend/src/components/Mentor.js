import React from "react";
import "../styles/mentor.css";

export default function Mentor({ mentorId, name, onConnect }) {

    const handleConnect = () => {
        onConnect(mentorId);
    };

    return (
        <div className="mentor">
            <span className="mentor-name">{name}</span>
            <button className="connect-button" onClick={handleConnect}>Connect</button>
        </div>
    );
}
