import axios from "axios";

const BACKEND_URL = "https://pathfinder-4ntr.onrender.com/";

export const loginCall = async (userCredentials, dispatch) => {
    dispatch({ type: "LOGIN_START" });
    try {
        const res = await axios.post(BACKEND_URL + "/api/auth/login", userCredentials);
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
        return "LOGIN_SUCCESS"; // Return the login status
    } catch (error) {
        dispatch({ type: "LOGIN_FAILURE", payload: error });
        throw error;
    }
};
