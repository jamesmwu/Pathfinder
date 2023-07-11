import React from "react";
import { NavLink } from "react-router-dom";
import '../styles/landingNavbar.css';

export default function LandingNavbar() {
    return (
        <div className="landingNav">
            <NavLink to="/" className="landingNavButton">
                Home
            </NavLink>
            <NavLink to="/about" className="landingNavButton">
                About
            </NavLink>
        </div>
    );
}