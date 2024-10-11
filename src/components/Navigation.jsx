import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navigation = () => {
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    return (
        <nav>
            <ul>
                <li>
                    <Link
                        to="/"
                        style={{
                            color: isActive("/") ? "white" : "blue",
                            backgroundColor: isActive("/") ? "blue" : "transparent",
                        }}
                    >
                        Home
                    </Link>
                </li>
                <li>
                    <Link
                        to="/signup"
                        style={{
                            color: isActive("/signup") ? "white" : "blue",
                            backgroundColor: isActive("/signup") ? "blue" : "transparent",
                        }}
                    >
                        Sign Up
                    </Link>
                </li>
                <li>
                    <Link
                        to="/signin"
                        style={{
                            color: isActive("/signin") ? "white" : "blue",
                            backgroundColor: isActive("/signin") ? "blue" : "transparent",
                        }}
                    >
                        Sign In
                    </Link>
                </li>
                <li>
                    <Link
                        to="/phoneauth"
                        style={{
                            color: isActive("/signin") ? "green" : "white",
                            backgroundColor: isActive("/phoneauth") ? "blue" : "transparent",
                        }}
                    >
                        Phone Authentication
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navigation;
