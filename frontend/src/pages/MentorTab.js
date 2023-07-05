import React from "react";
import Mentor from "../components/Mentor";

export default function MentorTab({ mentors, handleConnect }) {
    return (
        <div>
            <h1>Available Mentors</h1>
            <div className="mentorContainer">
                {mentors.map((mentor) => (
                    <div className="mentorInd" key={mentor._id} >
                        <Mentor mentorId={mentor._id} name={mentor.username} onConnect={handleConnect} />
                    </div>
                ))}
            </div>
        </div>
    );
}