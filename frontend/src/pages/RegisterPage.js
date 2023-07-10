import { useRef } from "react";
import "../styles/registerPage.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
    const username = useRef();
    const email = useRef();
    const password = useRef();
    const passwordAgain = useRef();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (passwordAgain.current.value !== password.current.value) {
            password.current.setCustomValidity("Passwords don't match");
        } else {
            const user = {
                username: username.current.value,
                email: email.current.value,
                password: password.current.value,
            };
            try {
                await axios.post("http://localhost:8800/api/auth/register", user);
                navigate("/login");
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <div className="login">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">Pathfinder</h3>
                    <span className="loginDesc">Your career questions, answered.</span>
                </div>
                <div className="loginRight">
                    <form className="registerBox" onSubmit={handleSubmit}>
                        <div className="registerInputWrapper">
                            <input
                                placeholder="Name"
                                required
                                ref={username}
                                className="loginInput"
                            />
                            <input
                                placeholder="Email"
                                required
                                ref={email}
                                type="email"
                                className="loginInput"
                            />
                            <input
                                placeholder="Password"
                                required
                                ref={password}
                                type="password"
                                className="loginInput"
                                minLength="6"
                            />
                            <input
                                placeholder="Confirm Password"
                                required
                                ref={passwordAgain}
                                type="password"
                                className="loginInput"
                            />
                        </div>
                        <div className="registerButtonWrapper">
                            <button className="loginButton" type="submit">
                                Sign up
                            </button>
                            <Link to="/login" style={{ textDecoration: "none", marginTop: "15px" }}>
                                <button className="loginRegisterButton">Log in with an Existing Account</button>
                            </Link>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
}
