import { useState, useEffect, memo } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import Masonry from "react-masonry-css";
import '../styles/mentorTab.css';
import Mentor from "../components/Mentor";
import MentorModal from "../components/MentorModal";

function MentorTab({ selectedMajors, socketRef, userId }) {
    console.log("mentor tab rerender");
    const [isOpen, setIsOpen] = useState(false);
    const [allMentors, setMentors] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);

    const breakpointColumnsObj = {
        default: 3,
        1300: 2,
        1100: 1
    };

    const handleConnect = async (mentorId) => {
        try {
            await axios.put(
                `${process.env.REACT_APP_BACKEND_URL}/api/users/${userId}/add-connection`,
                { userId: mentorId }
            ).then(async (response) => {
                // socketRef.current.emit("initialize rooms", { id: user._id });
                // socketRef.current.emit("process_new_connection", response.data.chatId);
                socketRef.current.emit("initialize rooms", userId, () => {
                    socketRef.current.emit("process_new_connection", { chatId: response.data.chatId });
                });
                console.log(response.data);
            });
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const fetchMentors = async () => {
            try {
                console.log(selectedMajors);
                const response = await axios.post(process.env.REACT_APP_BACKEND_URL + "/api/users/all-mentors", {
                    tags: selectedMajors
                });

                setMentors(response.data);
                console.log(response.data);
                setIsOpen(true);
            } catch (error) {
                console.log(error);
            }
        };

        fetchMentors();
    }, [selectedMajors]);

    const duration = 0.5;
    const variants = {
        open: { rotateY: 0 },
        closed: { rotateY: 90 }
    };

    function MentorItem({ mentorId, name, about }) {
        let random = Math.floor(Math.random() * (2 - 1 + 1) + 1);
        if (random === 1) {
            random = 0.25;
        } else {
            random = 0;
        }

        if (allMentors.length > 0) {
            return (
                <div className="item">
                    <motion.div
                        initial={{ rotateY: isOpen ? 90 : 0 }}
                        animate={isOpen ? "open" : "closed"}
                        variants={variants}
                        transition={{
                            rotateY: {
                                duration: duration,
                                ease: "easeInOut"
                            },
                            default: { ease: "easeInOut" }
                        }}
                        className="card"
                    >
                        <div>
                            <Mentor mentorId={mentorId} name={name} about={about} onConnect={handleConnect} setModalOpen={setModalOpen} />
                        </div>
                    </motion.div>
                </div>
            );
        }
        else {
            return false;
        }
    }

    return (
        <div>
            <Masonry
                breakpointCols={breakpointColumnsObj}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column"
            >
                {allMentors.map((mentor) => (
                    <div key={mentor._id}>
                        <MentorItem mentorId={mentor._id} name={mentor.username} about={mentor.description} />
                    </div>
                ))}
            </Masonry>
            <MentorModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
        </div>
    );
}

export default memo(MentorTab);
