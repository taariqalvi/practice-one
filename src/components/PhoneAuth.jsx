import React, { useState } from "react";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../firebaseConfig"; // Adjust path as necessary
import "./PhoneAuth.css";

auth.settings.appVerificationDisabledForTesting = true;

const PhoneAuth = () => {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [verificationCode, setVerificationCode] = useState("");
    const [confirmationResult, setConfirmationResult] = useState(null);

    // Set up reCAPTCHA verifier
    const setupRecaptcha = () => {
        // Check if recaptchaVerifier is already created
        if (!window.recaptchaVerifier) {
            window.recaptchaVerifier = new RecaptchaVerifier(
                "recaptcha-container", // The HTML element ID where reCAPTCHA will render
                {
                    size: "invisible", // Make it invisible; alternatively, you can set it to 'normal'
                    callback: (response) => {
                        // reCAPTCHA solved - will proceed with send verification code
                    },
                    "expired-callback": () => {
                        // Response expired; ask user to re-enter phone number
                        window.recaptchaVerifier.render().then((widgetId) => {
                            window.recaptchaVerifier.reset(widgetId);
                        });
                    },
                },
                auth // Pass the auth instance
            );
        }
    };

    const sendVerificationCode = (e) => {
        e.preventDefault();
        setupRecaptcha();

        const appVerifier = window.recaptchaVerifier;
        signInWithPhoneNumber(auth, phoneNumber, appVerifier)
            .then((confirmationResult) => {
                setConfirmationResult(confirmationResult);
                alert("Verification code sent!");
            })
            .catch((error) => {
                console.error("Error during signInWithPhoneNumber:", error);
                alert("Error: " + error.message);
            });
    };

    const verifyCode = (e) => {
        e.preventDefault();
        if (confirmationResult) {
            confirmationResult
                .confirm(verificationCode)
                .then((result) => {
                    const user = result.user;
                    alert("User verified successfully!");
                })
                .catch((error) => {
                    console.error("Error verifying code:", error);
                    alert("Error: " + error.message);
                });
        }
    };

    return (
        <div>
            <div id="recaptcha-container"></div>
            <form onSubmit={sendVerificationCode}>
                <input
                    type="text"
                    placeholder="Enter phone number (with country code)"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                />
                <button type="submit">Send Verification Code</button>
            </form>
            {confirmationResult && (
                <form onSubmit={verifyCode}>
                    <input
                        type="text"
                        placeholder="Enter verification code"
                        value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value)}
                    />
                    <button type="submit">Verify Code</button>
                </form>
            )}
        </div>
    );
};

export default PhoneAuth;
