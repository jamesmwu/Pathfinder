import React, { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Modal from "../components/Modal";
import Mentor from "../components/Mentor";
import '../styles/homePage.css';

export default function HomePage() {
    const [isOpen, setIsOpen] = useState(false);
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

    const { logout } = useContext(AuthContext);

    const handleLogout = () => {
        logout(); // Call the logout function from the AuthContext
    };

    return (
        <div className="home-page">
            <div className="sidebar-left">
                <div className="leftContainer">
                    <h2>My Interests</h2>
                    <ul>
                        {selectedMajors.map((major) => (
                            <li key={major}>{major}</li>
                        ))}
                    </ul>
                </div>

                <button onClick={openModal}>Select Interests</button>
            </div>
            <div className="main-content">
                <h1>Home Page</h1>
                <Mentor name="Deez Nuts" />
                <Modal
                    isOpen={isOpen}
                    majors={['Computer Science', 'Premed']}
                    onClose={closeModal}
                    onSubmit={handleModalSubmit}
                />
            </div>
            <div className="sidebar-right">
                <h2>My Chats</h2>
                <NavLink to="/" onClick={handleLogout}>
                    Log Out
                </NavLink>
            </div>
        </div>
    );
}
