import React from "react";
import "../styles/mentor.css";

export default function Mentor({ mentorId, name, about, onConnect }) {

    const handleConnect = () => {
        onConnect(mentorId);
    };

    return (
        <div className="mentor">
            <h2 className="mentor-name">{name}</h2>
            <p>{about}</p>
            <button className="connect-button" onClick={handleConnect}>Connect</button>
        </div>
    );
}
