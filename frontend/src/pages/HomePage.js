import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Modal from "../components/Modal";
import '../styles/homePage.css';

export default function HomePage() {
    const [isOpen, setIsOpen] = useState(true);
    const [selectedMajors, setSelectedMajors] = useState([]);

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    const handleModalSubmit = (majors) => {
        setSelectedMajors(majors);
        closeModal();
    };

    return (
        <div className="home-page">
            <div className="sidebar-left">
                <h2>My Interests</h2>
                <ul>
                    {selectedMajors.map((major) => (
                        <li key={major}>{major}</li>
                    ))}
                </ul>
            </div>
            <div className="main-content">
                <h1>Home Page</h1>
                <Modal isOpen={isOpen} majors={['Computer Science', 'Premed']} onClose={closeModal} onSubmit={handleModalSubmit} />
                <NavLink to="/">Go to Login Page</NavLink>
                <button onClick={openModal}>Open Modal</button>
            </div>
            <div className="sidebar-right">MY CHATS</div>
        </div>
    );
}
