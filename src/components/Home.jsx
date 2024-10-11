import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebaseConfig";
import { signOut } from "firebase/auth";

const Home = () => {

    const [userName, setUserName] = useState("");
    const [greeting, setGreeting] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        // Fetch the current user
        const currentUser = auth.currentUser;

        if (currentUser) {
            setUserName(currentUser.displayName || "User");
        }

        // Determine the greeting message based on the current time
        const getGreetingMessage = () => {
            const hours = new Date().getHours();

            if (hours < 12) {
                return "Good Morning";
            } else if (hours < 18) {
                return "Good Afternoon";
            } else {
                return "Good Evening";
            }
        };

        setGreeting(getGreetingMessage());
    }, []);


    const handleSignOut = async () => {
        try {
            await signOut(auth);
            console.log("Auth >>>>", auth);
            navigate("/signin");
        } catch (error) {
            console.error("Error signing out", error);
        }
    };

    return (
        <div>
            <h2>Home</h2>
            <p>Welcome to the Firebase Authentication App!</p>
            <h3>{greeting}, {userName}!</h3>
            <button onClick={handleSignOut}>Sign Out</button>
        </div>
    );
};

export default Home;
