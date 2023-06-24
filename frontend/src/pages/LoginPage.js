import React from "react";
import { NavLink } from "react-router-dom";

export default function LoginPage() {
    return (
        <div>
            <h1>Login Page</h1>
            <NavLink to='/root'>Go to Root Page</NavLink>
        </div>
    );
}