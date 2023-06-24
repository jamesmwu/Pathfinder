import React from "react";
import { NavLink } from "react-router-dom";
import Modal from "../components/Modal";

export default function HomePage() {
    return (
        <div>
            <h1>Root Page</h1>
            <Modal isOpen={true} majors={["Computer Science", "Mathematics", "Physics"]} />
            <NavLink to='/'>Go to Login Page</NavLink>
        </div>
    );
}