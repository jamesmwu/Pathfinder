import React from "react";
import "../styles/mentor.css";

export default function Mentor({ mentorId, name, about, onConnect, setModalOpen, setName, setDescription, imgSrc, setModalImg, setMentorId, longDesc }) {

    const handleConnect = () => {
        onConnect(mentorId);
    };

    const handleAbout = () => {
        setName(name);
        setDescription(longDesc);
        setModalImg(imgSrc);
        setMentorId(mentorId);
        setModalOpen(true);
    };

    return (
        <div className="mentor">
            <h2 className="mentor-name">{name}</h2>
            <img src={imgSrc} alt="Mentor" className="mentor-image" />
            <p>{about}</p>
            <div className="mentorBtnContainer">
                <button className="about-button" onClick={handleAbout}>About</button>
                <button className="connect-button" onClick={handleConnect}>Connect</button>
            </div>
        </div>
    );
}
