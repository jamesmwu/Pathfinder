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


export default function HomePage() {
    const connectionTemplate = { mentor: { _id: "" }, chat: {} };
    const [isOpen, setIsOpen] = useState(false);
    const [selectedMajors, setSelectedMajors] = useState([]);
    const [tags, setTags] = useState([]);
    const [connections, setConnections] = useState([]); //contain an array of objects, each object contains two fields, one for a user json and chat json.
    const [tab, setTab] = useState("Articles");
    const [currentSelectedConnection, setCurrentSelectedConnection] = useState(connectionTemplate);

    const { user, logout } = useContext(AuthContext);
    const chatContentRef = useRef(null);

    const scrollToBottom = () => {
        if (chatContentRef.current) {
            chatContentRef.current.scrollTop = chatContentRef.current.scrollHeight;
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [connections]);

    const socketRef = useRef();
    useEffect(() => {
        socketRef.current = socketIO.connect(`${process.env.REACT_APP_BACKEND_URL}?userId=${user._id}`);
        return () => socketRef.current.disconnect();
    }, [user._id]);

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
            let response = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/users/update-tags/${userId}`, {
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
            await axios.put(
                `${process.env.REACT_APP_BACKEND_URL}/api/users/${userId}/add-connection`,
                { userId: mentorId }
            ).then((response) => {
                socketRef.current.emit("initialize rooms", { id: user._id });
                console.log(response.data);
            });

            const fetchConnections = async () => {
                try {
                    const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/users/?userId=${user._id}`);
                    setSelectedMajors(response.data.tags);
                    const connections = response.data.connections;
                    const arr = [];

                    for (const connection of connections) {
                        const mentorResponse = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/users/?userId=${connection.userId}`);
                        const chatResponse = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/chats/single/?chatId=${connection.chatId}`);
                        arr.push({ mentor: mentorResponse.data, chat: chatResponse.data, newMessage: connection.newMessage });
                    }

                    setConnections(arr);
                    if (arr.length > 0) {
                        setCurrentSelectedConnection(arr[0]);
                    }
                } catch (error) {
                    console.log(error);
                }
            };


            fetchConnections();


        } catch (error) {
            console.log(error);
        }
    };


    const handleLogout = () => {
        logout(); // Call the logout function from the AuthContext
    };

    const handleChatSelect = (connection) => {
        connection.newMessage = false;
        setCurrentSelectedConnection(connection);
        setTab("Chats");
    };

    useEffect(() => {

        const fetchTags = async () => {
            try {
                const response = await axios.get(process.env.REACT_APP_BACKEND_URL + '/api/users/all-tags');
                setTags(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        const fetchConnections = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/users/?userId=${user._id}`);
                setSelectedMajors(response.data.tags);
                const connections = response.data.connections;
                const arr = [];

                for (const connection of connections) {
                    const mentorResponse = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/users/?userId=${connection.userId}`);
                    const chatResponse = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/chats/single/?chatId=${connection.chatId}`);
                    arr.push({ mentor: mentorResponse.data, chat: chatResponse.data, newMessage: connection.newMessage });
                }

                setConnections(arr);
                if (arr.length > 0) {
                    setCurrentSelectedConnection(arr[0]);
                }
            } catch (error) {
                console.log(error);
            }
        };


        fetchConnections();
        fetchTags();

    }, [user._id]);


    let tabMap = {
        "Articles": <ArticleTab />,
        "Mentors": <MentorTab selectedMajors={selectedMajors} handleConnect={handleConnect} />,
        "Chats": <ChatTab
            connection={currentSelectedConnection}
            connectionsArray={connections}
            setConnection={setConnections}
            user={user}
            socket={socketRef.current}
            currentSelectedConnection={currentSelectedConnection}
            chatContentRef={chatContentRef}
            scrollToBottom={scrollToBottom}
        />
    };

    useEffect(() => {
        function addMessage(data, to) {
            let arr = [];
            for (let i = 0; i < connections.length; i++) {
                //Push connection if the chat is the one that got updated
                if (connections[i].chat._id === to) {
                    let updated = { ...connections[i] };
                    updated.chat.messages.push(data);

                    if (tab === "Chats" && currentSelectedConnection.chat._id === to) {
                        socketRef.current.emit("read message", { roomId: to });
                        updated.newMessage = false;
                    }
                    else {
                        updated.newMessage = true;
                    }

                    arr.push(updated);
                }
                else {
                    arr.push(connections[i]);
                }
            }
            setConnections(arr);
        }

        socketRef.current.on("private message", addMessage);

        return () => {
            socketRef.current.off('private message', addMessage);
        };
    }, [connections, tab, currentSelectedConnection]);

    return (
        <div className="home-page">
            <div className="sidebar-left">
                <div className="leftContainer">
                    <h2>My Interests</h2>
                    <ul className="homeUL">
                        {selectedMajors.map((major) => (
                            <li key={major} className="majorList">{major}</li>
                        ))}
                    </ul>
                </div>

                <button className="interests" type="button" onClick={openModal}>Select Interests</button>
            </div>
            <div className="main-content">
                <Navbar tabs={Object.keys(tabMap)} setTab={setTab} activeTab={tab} currentSelectedConnection={currentSelectedConnection} />
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
                <div className="chatContainer">
                    <h2>Connections</h2>
                    <ul className="mentorUL">
                        {connections.map((connection) => (
                            <li
                                key={connection.mentor._id}
                                className={
                                    currentSelectedConnection.mentor._id === connection.mentor._id && tab === "Chats"
                                        ? "mentorListCur"
                                        : connection.newMessage
                                            ? "mentorListNewMsg"
                                            : "mentorList"
                                }
                                onClick={() => {
                                    handleChatSelect(connection);
                                }}
                            >
                                {connection.mentor.username}
                            </li>
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
