import React from "react";
import "../styles/landingPage.css";

export default function LandingPage() {
    return (
        <div className="landing-page">
            <section className="hero-section">
                <div className="hero-content">
                    <h1>Welcome to Pathfinder</h1>
                    <p>Your Career Questions, Answered</p>
                </div>
            </section>

            <section className="about-section">
                <div className="about-content">
                    <h2>About Us</h2>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
                        at tincidunt turpis. Suspendisse id ligula et lectus volutpat
                        elementum vitae in magna. Phasellus non magna a tortor ultricies
                        mollis at eu risus.
                    </p>
                    <p>
                        Sed quis lorem sed felis porttitor egestas. Sed eget sem id leo
                        luctus placerat at ac est. Phasellus auctor purus augue, non
                        iaculis urna facilisis a.
                    </p>
                </div>
            </section>

            <section className="statistics-section">
                <div className="statistics-content">
                    <h2>Statistics</h2>
                    <div className="statistics-grid">
                        <div className="statistic-item">
                            <h3>1000+</h3>
                            <p>Users</p>
                        </div>
                        <div className="statistic-item">
                            <h3>500+</h3>
                            <p>Mentors</p>
                        </div>
                        <div className="statistic-item">
                            <h3>2000+</h3>
                            <p>Connections</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="contact-section">
                <div className="contact-content">
                    <h2>Contact Us</h2>
                    <p>
                        For any inquiries or support, please reach out to our team at{" "}
                        <a href="mailto:info@pathfinder.com">info@pathfinder.com</a>.
                    </p>
                </div>
            </section>
        </div>
    );
}
