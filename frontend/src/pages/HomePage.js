import React, { useState, useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Modal from "../components/Modal";
import Mentor from "../components/Mentor";
import axios from 'axios';
import '../styles/homePage.css';

export default function HomePage() {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedMajors, setSelectedMajors] = useState([]);
    const [tags, setTags] = useState([]);
    const [mentors, setMentors] = useState([]);
    const [connections, setConnections] = useState([]);
    const [chatId, setChatId] = useState("")

    const { user, logout } = useContext(AuthContext);

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    const handleModalSubmit = async (majors) => {
        setSelectedMajors(majors);
        closeModal();

        try {
            const userId = user._id;
            let response = await axios.put(`http://localhost:8800/api/users/update-tags/${userId}`, {
                userId: userId,
                tags: majors
            });
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    };

    const handleLogout = () => {
        logout(); // Call the logout function from the AuthContext
    };

    useEffect(() => {
        const fetchTags = async () => {
            try {
                const response = await axios.get('http://localhost:8800/api/users/all-tags');
                setTags(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        const fetchMentors = async () => {
            try {
                const response = await axios.get('http://localhost:8800/api/users/all-mentors');
                setMentors(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        const fetchUsers = async () => {
            try {
                const response = await axios.get(`http://localhost:8800/api/users/?userId=${user._id}`);
                setSelectedMajors(response.data.tags);
            } catch (error) {
                console.log(error);
            }
        };
        fetchUsers();
        fetchTags();
        fetchMentors();
    }, []);

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

                <button className="interests" type="button" onClick={openModal}>Select Interests</button>
            </div>
            <div className="main-content">
                <h1>Available Mentors</h1>
                <div className="mentorContainer">
                    {mentors.map((mentor) => (
                        <div className="mentorInd">
                            <Mentor key={mentor._id} name={mentor.username} />
                        </div>
                    ))}
                </div>

                <Modal
                    isOpen={isOpen}
                    majors={tags}
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
