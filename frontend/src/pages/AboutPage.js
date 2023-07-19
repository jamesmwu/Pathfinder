import React from "react";
import LandingNavbar from "../components/LandingNavbar";
import '../styles/aboutPage.css';

export default function AboutPage() {
    return (
        <div>
            <LandingNavbar />
            <div className="about">
                <div className="aboutInfo">
                    <h1>What is Pathfinder?</h1>
                    <br />
                    <p>Pathfinder is an online platform that helps you explore career options by connecting you with college mentors.</p>
                    <br />
                    <p>Oftentimes when we think of different jobs-- doctors, accountants, software engineers, journalists-- we might have a general idea of what they do. But each one of these careers have different requirements and actionable steps that are recommended to follow, and most the time finding the answers to those questions takes a lot of effort and networking!</p>
                    <br />
                    <p>Pathfinder aims to make understanding career paths simpler by directly connecting you with individuals experienced in their fields, so you can learn what the job entails or how you can get there yourself!</p>
                    <br />
                    <p>Sign up now talk to a mentor and gain some career insight, today! :)</p>
                </div>
            </div>
        </div>

    );
}