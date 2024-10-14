import React, { useState } from "react";
import { auth } from "../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate, useLocation } from "react-router-dom";
import PhoneAuth from "./PhoneAuth";

const SignIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [phone, setPhone] = useState(""); // For phone input

    const navigate = useNavigate();
    const location = useLocation(); // Hook to get current path

    const handleSignIn = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );
            console.log(userCredential.user);
            navigate("/");
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div>
            {location.pathname === "/signin" ? (
                <div>
                    <h2>Sign In</h2>
                    <form onSubmit={handleSignIn}>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button type="submit">Sign In</button>
                    </form>
                    {error && <p>{error}</p>}
                </div>
            ) : location.pathname === "/phoneauth" ? (
                <div>
                    <h2>Phone Authentication</h2>
                    <PhoneAuth />
                </div>
            ) : null}
        </div>
    );
};

export default SignIn;
