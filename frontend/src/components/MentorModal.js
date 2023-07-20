import React from 'react';
import '../styles/mentorModal.css';
import mentorImage from '../img/cursedCat.png'; // Replace with the actual image path

export default function MentorModal({ name, img, description, isOpen, onClose, onConnect }) {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="mentorModal">
            <div className="mentor-modal-content">
                <h1>{name}</h1>
                <img src={mentorImage} alt="Mentor" className="mentor-image" />
                <p>{description}</p>

                <button className="modal-connect" onClick={onConnect}>
                    Connect
                </button>
                <button className="modalClose" onClick={onClose}>
                    Close
                </button>
            </div>
        </div>
    );
}
