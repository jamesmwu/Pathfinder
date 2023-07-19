import { useContext, useRef, useCallback, useState } from "react";
import { useNavigate } from 'react-router-dom';
import "../styles/loginPage.css";
import { AuthContext } from "../context/AuthContext";
import { loginCall } from "../context/loginCall";
import LandingNavbar from "../components/LandingNavbar";


export default function Login() {
    const email = useRef();
    const password = useRef();
    const navigate = useNavigate();
    const createNewAccountClick = useCallback(() => navigate('/register', { replace: true }), [navigate]);

    const { isFetching, dispatch } = useContext(AuthContext);

    const [error, setError] = useState(false);

    const handleClick = async (e) => {
        e.preventDefault();
        loginCall(
            { email: email.current.value, password: password.current.value },
            dispatch
        )
            .then((loginStatus) => {
                if (loginStatus === "LOGIN_SUCCESS") {
                    navigate("/");
                }
                else {
                    setError(true);
                }
            })
            .catch((error) => {
                setError(true);
                console.log(error);
            });
    };

    return (
        <div>
            <LandingNavbar />
            <div className="login">
                <div className="loginWrapper">
                    <h3 className="loginLogo">Log In</h3>
                    <div className="loginRight" onSubmit={handleClick}>
                        <form className="loginBox">
                            <div className="inputWrapper">
                                <input
                                    placeholder="Email"
                                    type="email"
                                    required
                                    className="loginInput"
                                    ref={email}
                                />
                                <input
                                    placeholder="Password"
                                    type="password"
                                    required
                                    minLength="6"
                                    className="loginInput"
                                    ref={password}
                                    style={{ marginTop: "30px" }}
                                />
                            </div>
                            {error && <span className="loginError">Invalid credentials</span>}

                            <div className="loginButtonWrapper">
                                <button className="loginButton">
                                    {isFetching ? "Loading..." : "Log In"}
                                </button>
                                {/* <span className="loginForgot">Forgot Password?</span> */}
                                <button className="loginRegisterButton" style={{ marginTop: "15px" }}
                                    onClick={createNewAccountClick}>
                                    Create a new account
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
