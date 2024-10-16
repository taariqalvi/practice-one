// import React, { useState } from "react";
// import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
// import { auth } from "../firebaseConfig";
// import "./PhoneAuth.css";
// import PhoneInput from "react-phone-input-2";
// import 'react-phone-input-2/lib/style.css'

// // auth.settings.appVerificationDisabledForTesting = true;

// const PhoneAuth = () => {
//     const [phoneNumber, setPhoneNumber] = useState("");
//     const [verificationCode, setVerificationCode] = useState("");
//     const [confirmationResult, setConfirmationResult] = useState(null);


//     // Set up reCAPTCHA verifier
//     const setupRecaptcha = () => {
//         // Check if recaptchaVerifier is already created
//         if (!window.recaptchaVerifier) {
//             window.recaptchaVerifier = new RecaptchaVerifier(
//                 "recaptcha-container", // The HTML element ID where reCAPTCHA will render
//                 {
//                     size: "normal", // Make it invisible; alternatively, you can set it to 'normal'
//                     callback: (response) => {
//                         // reCAPTCHA solved - will proceed with send verification code
//                     },
//                     "expired-callback": () => {
//                         // Response expired; ask user to re-enter phone number
//                         window.recaptchaVerifier.render().then((widgetId) => {
//                             window.recaptchaVerifier.reset(widgetId);
//                         });
//                     },
//                 },
//                 auth // Pass the auth instance
//             );
//         }
//     };

//     const sendVerificationCode = (e) => {
//         e.preventDefault();
//         setupRecaptcha();

//         const appVerifier = window.recaptchaVerifier;
//         signInWithPhoneNumber(auth, phoneNumber, appVerifier)
//             .then((confirmationResult) => {
//                 window.confirmationResult = confirmationResult;
//                 setConfirmationResult(confirmationResult);
//                 alert("Verification code sent!");
//                 console.log("Confirm >>>>>>>>>", confirmationResult);
//             })
//             .catch((error) => {
//                 console.error("Error during signInWithPhoneNumber:", error);
//                 alert("Error: " + error.message);
//             });
//     };

//     const verifyCode = (e) => {
//         e.preventDefault();
//         if (confirmationResult) {
//             confirmationResult
//                 .confirm(verificationCode)
//                 .then((result) => {
//                     const user = result.user;
//                     alert("User verified successfully!");
//                 })
//                 .catch((error) => {
//                     console.error("Error verifying code:", error);
//                     alert("Error: " + error.message);
//                 });
//         }
//     };

//     return (
//         <div className="phone-auth-container">
//             <div id="recaptcha-container"></div>
//             <form onSubmit={sendVerificationCode} className="phoneAuthForm">
//                 {/* <input
//                     type="text"
//                     placeholder="Enter phone number (with country code)"
//                     value={phoneNumber}
//                     onChange={(e) => setPhoneNumber(e.target.value)}
//                 /> */}
//                 <PhoneInput
//                     country={"us"}
//                     value={phoneNumber}
//                     onChange={(e) => setPhoneNumber(e.target.value)}
//                     className="phone-input"
//                 />
//                 <button type="submit">Send Verification Code</button>
//             </form>
//             {confirmationResult && (
//                 <form onSubmit={verifyCode}>
//                     <input
//                         type="text"
//                         placeholder="Enter verification code"
//                         value={verificationCode}
//                         onChange={(e) => setVerificationCode(e.target.value)}
//                     />
//                     <button type="submit">Verify Code</button>
//                 </form>
//             )}
//         </div>
//     );
// };

// export default PhoneAuth;

import React, { useState } from "react";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../firebaseConfig";
import "./PhoneAuth.css";
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css';

// auth.settings.appVerificationDisabledForTesting = true;

const PhoneAuth = () => {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [verificationCode, setVerificationCode] = useState("");
    const [confirmationResult, setConfirmationResult] = useState(null);

    // Set up reCAPTCHA verifier
    const setupRecaptcha = () => {
        if (window.recaptchaVerifier) {
            // Reset reCAPTCHA if it was already initialized
            window.recaptchaVerifier.reset();
        } else {
            // Create new reCAPTCHA instance
            window.recaptchaVerifier = new RecaptchaVerifier(
                "recaptcha-container",
                {
                    size: "normal", // You can change this to 'invisible' for an invisible reCAPTCHA
                    callback: (response) => {
                        // reCAPTCHA solved, allow the user to send verification code
                    },
                    "expired-callback": () => {
                        // Handle expired reCAPTCHA
                        alert("reCAPTCHA expired. Please complete it again.");
                    },
                },
                auth // Pass the auth instance
            );
        }
    };

    // Send the verification code to the user's phone
    const sendVerificationCode = (e) => {
        e.preventDefault();
        setupRecaptcha();

        const appVerifier = window.recaptchaVerifier;

        signInWithPhoneNumber(auth, `+${phoneNumber}`, appVerifier)
            .then((result) => {
                setConfirmationResult(result);
                alert("Verification code sent!");
            })
            .catch((error) => {
                console.error("Error sending verification code:", error);
                alert("Failed to send verification code. " + error.message);
            });
    };

    // Verify the code that the user inputs
    const verifyCode = (e) => {
        e.preventDefault();
        if (confirmationResult) {
            confirmationResult
                .confirm(verificationCode)
                .then((result) => {
                    const user = result.user;
                    alert("User verified successfully!");
                    console.log("User:", user);
                })
                .catch((error) => {
                    console.error("Error verifying code:", error);
                    alert("Verification failed. " + error.message);
                });
        }
    };

    return (
        <div className="phone-auth-container">
            <div id="recaptcha-container"></div> {/* The reCAPTCHA container */}
            <form onSubmit={sendVerificationCode} className="phoneAuthForm">
                <PhoneInput
                    country={"us"}
                    value={phoneNumber}
                    onChange={setPhoneNumber}
                    className="phone-input"
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

