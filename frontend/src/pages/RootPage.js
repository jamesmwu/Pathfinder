import React from "react";
import { NavLink } from "react-router-dom";

export default function RootPage() {
    return (
        <div>
            <h1>Root Page</h1>
            <NavLink to='/'>Go to Login Page</NavLink>
        </div>
    );
}