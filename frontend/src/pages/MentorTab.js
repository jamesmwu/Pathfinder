import { useState, useEffect, memo } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import Masonry from "react-masonry-css";
import '../styles/mentorTab.css';
import Mentor from "../components/Mentor";
import MentorModal from "../components/MentorModal";
import { Buffer } from "buffer";

function MentorTab({ selectedMajors, socketRef, userId }) {
    console.log("mentor tab rerender");
    const [isOpen, setIsOpen] = useState(false);
    const [allMentors, setMentors] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [name, setName] = useState("Mentor Name");
    const [description, setDescription] = useState("Description");
    const [modalImg, setModalImg] = useState("");
    const [modalMentorId, setMentorId] = useState("");

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
                socketRef.current.emit('process_new_connection', userId, mentorId);
            });
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const fetchMentors = async () => {
            try {
                const response = await axios.post(process.env.REACT_APP_BACKEND_URL + "/api/users/all-mentors", {
                    tags: selectedMajors
                });

                setMentors(response.data);
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
        const [imageSrc, setImageSrc] = useState(null);

        const fetchMentorImgs = async () => {
            try {
                const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/get-profile-pic`, { userId: mentorId }, {
                    responseType: 'arraybuffer'
                });

                // Handle the arraybuffer response here
                const arrayBuffer = response.data;
                let base64ImageString = Buffer.from(arrayBuffer, 'binary').toString('base64');
                let srcValue = "data:image/png;base64," + base64ImageString;
                setImageSrc(srcValue);
                // console.log(srcValue);
            } catch (error) {
                // Handle errors here
                console.error('Error fetching profile pic:', error);
            }
        };

        useEffect(() => {
            fetchMentorImgs();
        }, [mentorId]);

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
                            <Mentor
                                mentorId={mentorId}
                                name={name} about={about}
                                onConnect={handleConnect}
                                setModalOpen={setModalOpen}
                                setName={setName}
                                setDescription={setDescription}
                                imgSrc={imageSrc}
                                setModalImg={setModalImg}
                                setMentorId={setMentorId}
                            />
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
            <MentorModal
                name={name}
                description={description}
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                imgSrc={modalImg}
                onConnect={handleConnect}
                mentorId={modalMentorId}
                setModalOpen={setModalOpen}
            />
        </div>
    );
}

export default memo(MentorTab);
