import { useContext, useRef, useCallback } from "react";
import { useNavigate } from 'react-router-dom';
import "../styles/loginPage.css";
import { AuthContext } from "../context/AuthContext";
import { loginCall } from "../loginCall";

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
                    navigate("/home");
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
                    <h3 className="loginLogo">Bistro</h3>
                    <span className="loginDesc">Find Dining is Fine Dining.</span>
                </div>
                <div className="loginRight" onSubmit={handleClick}>
                    <form className="loginBox">
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
                        />
                        <button className="loginButton">
                            {isFetching ? "Loading..." : "Log In"}
                        </button>
                        <span className="loginForgot">Forgot Password?</span>
                        <button className="loginRegisterButton" onClick={createNewAccountClick}>
                            Create a New Account
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
