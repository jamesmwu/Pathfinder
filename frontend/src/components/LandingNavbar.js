import React from "react";
import { NavLink } from "react-router-dom";
import '../styles/landingNavbar.css';

export default function LandingNavbar() {
    return (
        <div className="landingNav">
            <NavLink to="/" className="landingNavButton" style={{ padding: 0 }}>
                <h3>Pathfinder</h3>
            </NavLink>
            <div className="landingNavContainer">
                <NavLink to="/about" className="landingNavButton">
                    About
                </NavLink>
                <NavLink to="/login" className="landingNavButton">
                    Login
                </NavLink>
            </div>

        </div>
    );
}