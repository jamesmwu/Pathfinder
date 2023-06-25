import React from "react";
import "../styles/mentor.css";

export default function Mentor({ name }) {
    return (
        <div className="mentor">
            <span className="mentor-name">{name}</span>
        </div>
    );
}
