import React from "react";
import { NavLink } from "react-router-dom";

export default function LoginPage() {
    return (
        <div>
            <h1>Login Page</h1>
            <a href="https://youtu.be/eBGIQ7ZuuiU" target="_blank" rel="noreferrer"><h2>Super top secret link</h2></a>
            <NavLink to='/home'><h1>Sign in with Google</h1></NavLink>
        </div>
    );
}