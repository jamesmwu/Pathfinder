import { useContext, useRef, useCallback } from "react";
import { useNavigate } from 'react-router-dom';
import "../styles/loginPage.css";
import { AuthContext } from "../context/AuthContext";
import { loginCall } from "../context/loginCall";


export default function Login() {
    const email = useRef();
    const password = useRef();
    const navigate = useNavigate();
    const createNewAccountClick = useCallback(() => navigate('/register', { replace: true }), [navigate]);

    const { isFetching, dispatch } = useContext(AuthContext);

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
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div className="login">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">Pathfinder</h3>
                    <span className="loginDesc">Your career questions, answered.</span>
                </div>
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
    );
}
