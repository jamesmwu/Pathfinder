import { useRef, useContext, useState } from "react";
import "../styles/registerPage.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { loginCall } from "../context/loginCall";


export default function Register() {
    const username = useRef();
    const email = useRef();
    const password = useRef();
    const passwordAgain = useRef();
    const navigate = useNavigate();

    const { isFetching, dispatch } = useContext(AuthContext);

    const [error, setError] = useState(false);

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
                console.log("ASDABSDJHASD");
                await axios.post(process.env.REACT_APP_BACKEND_URL + "/api/auth/register", user);
                console.log("CHICKEN");
                loginCall(
                    { email: email.current.value, password: password.current.value },
                    dispatch
                )
                    .then((loginStatus) => {
                        if (loginStatus === "LOGIN_SUCCESS") {
                            navigate("/");
                        } else {
                            setError(true);
                            console.log("HERE");
                        }
                    })
                    .catch((error) => {
                        setError(true);
                        console.log(error);
                    });
            } catch (error) {
                setError(true);
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
                            {error && <span className="registerError">Invalid credentials</span>}
                            <button className="loginButton" type="submit">
                                {isFetching ? "Loading..." : "Sign Up"}
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
