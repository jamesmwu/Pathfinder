import React, { useState, useContext, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Modal from "../components/Modal";
import MentorTab from "./MentorTab";
import Navbar from "../components/Navbar";
import ArticleTab from "./ArticleTab";
import ChatTab from "./ChatTab";
import axios from 'axios';
import '../styles/homePage.css';

import socketIO from "socket.io-client";
// const socket = socketIO.connect("http://localhost:8800");

export default function HomePage() {
    const connectionTemplate = { mentor: { _id: "" }, chat: {} };
    const [isOpen, setIsOpen] = useState(false);
    const [selectedMajors, setSelectedMajors] = useState([]);
    const [tags, setTags] = useState([]);
    const [allMentors, setMentors] = useState([]);
    /*
    const [connectedUsers, setConnectedUsers] = useState([]); //holds user json connections
    const [connectedChats, setConnectedChats] = useState([]); //holds chat json connections
    */
    const [connections, setConnections] = useState([]); //contain an array of objects, each object contains two fields, one for a user json and chat json.
    const [tab, setTab] = useState("Articles");
    const [currentSelectedConnection, setCurrentSelectedConnection] = useState(connectionTemplate);

    const { user, logout } = useContext(AuthContext);

    const socketRef = useRef();
    useEffect(() => {
        socketRef.current = socketIO.connect("http://localhost:8800");
        return () => socketRef.current.disconnect();
    }, []);

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

    const handleConnect = async (mentorId) => {
        try {
            const userId = user._id;
            const response = await axios.put(
                `http://localhost:8800/api/users/${userId}/add-connection`,
                { userId: mentorId }
            );
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    };



    const handleLogout = () => {
        logout(); // Call the logout function from the AuthContext
    };

    const handleChatSelect = (connection) => {
        if (connection.mentor._id === currentSelectedConnection.mentor._id) {
            setCurrentSelectedConnection(connectionTemplate);
        }
        else {
            setCurrentSelectedConnection(connection);
        }
        //console.log(currentSelectedConnection)
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
        /*
        const fetchChats = async () => {
            const response = await axios.get(`http://localhost:8800/api/users/?userId=${user._id}`);
            const connections = response.data.connections;
            const arr = [];
            await Promise.all(
                connections.map(async (connection) => {
                    const mentorResponse = await axios.get(`http://localhost:8800/api/chats/single/?chatId=${connection.chatId}`);
                    arr.push(mentorResponse.data);
                })
            );
            setConnectedChats(arr)
        }
        */

        const fetchConnections = async () => {
            try {
                const response = await axios.get(`http://localhost:8800/api/users/?userId=${user._id}`);
                setSelectedMajors(response.data.tags);
                const connections = response.data.connections;
                const arr = [];

                await Promise.all(
                    connections.map(async (connection) => {
                        const mentorResponse = await axios.get(`http://localhost:8800/api/users/?userId=${connection.userId}`);
                        const chatResponse = await axios.get(`http://localhost:8800/api/chats/single/?chatId=${connection.chatId}`);
                        arr.push({ mentor: mentorResponse.data, chat: chatResponse.data });
                    })
                );

                setConnections(arr);
            } catch (error) {
                console.log(error);
            }
        };

        fetchConnections();
        fetchTags();
        fetchMentors();
        socketRef.current.emit("initialize rooms", { id: user._id });

    }, [user._id]);

    // useEffect(() => {
    //     console.log(connections);
    // }, [connections]);

    let tabMap = {
        "Articles": <ArticleTab />,
        "Mentors": <MentorTab mentors={allMentors} handleConnect={handleConnect} />,
        "Chats": <ChatTab connection={currentSelectedConnection} user={user} socket={socketRef.current} />
    };

    useEffect(() => {
        function addMessage(data, to) {
            console.log(connections); //prints original array (without edits)
            // let updated = connections.map((connection) => connection.mentor._id === data.sender ? {
            //     ...connection,
            //     chat: { ...connection.chat, messages: [...connection.chat.messages, data] }
            // } : connection);
            let arr = [];
            for (let i = 0; i < connections.length; i++) {
                //Push connection if the chat is the one that got updated
                if (connections[i].chat._id === to) {
                    let updated = { ...connections[i] };
                    updated.chat.messages.push(data);
                    arr.push(updated);
                    // console.log(updated);
                }
                else {
                    arr.push(connections[i]);
                    // console.log(connections[i]);
                }
            }

            setConnections(arr);
            console.log(connections); //prints updated array
        }

        socketRef.current.on("private message", addMessage);

        return () => {
            socketRef.current.off('private message', addMessage);
        };
    }, [connections]);

    // useEffect(() => {
    //     console.log(connections);
    // }, [connections]);

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
                <Navbar tabs={Object.keys(tabMap)} setTab={setTab} activeTab={tab} />
                <div className="tab-content">
                    {tabMap[tab]}
                </div>


                <Modal
                    isOpen={isOpen}
                    majors={tags}
                    curSelectedMajors={selectedMajors}
                    onClose={closeModal}
                    onSubmit={handleModalSubmit}
                />
            </div>
            <div className="sidebar-right">
                <div>
                    <h2>My Chats</h2>
                    <ul>
                        {connections.map((connection) => (
                            <li key={connection.mentor._id} className="mentorList" onClick={() => { handleChatSelect(connection); }}>{connection.mentor.username}</li>
                        ))}
                    </ul>
                </div>

                <NavLink to="/" onClick={handleLogout} className="logoutHome">
                    Log Out
                </NavLink>
            </div>
        </div>
    );
}
