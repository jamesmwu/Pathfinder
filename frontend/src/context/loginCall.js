import axios from "axios";


export const loginCall = async (userCredentials, dispatch) => {
    console.log(process.env.REACT_APP_BACKEND_URL);
    dispatch({ type: "LOGIN_START" });
    try {
        const res = await axios.post(process.env.REACT_APP_BACKEND_URL + "/api/auth/login", userCredentials);
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
        return "LOGIN_SUCCESS"; // Return the login status
    } catch (error) {
        dispatch({ type: "LOGIN_FAILURE", payload: error });
        throw error;
    }
};
