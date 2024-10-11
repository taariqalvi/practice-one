import React, { useState } from 'react';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import './PhoneAuth.css';

const PhoneAuth = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [isCodeSent, setIsCodeSent] = useState(false);

    // Set up Recaptcha
    const setupRecaptcha = () => {
        window.recaptchaVerifier = new RecaptchaVerifier(
            'recaptcha-container',
            {
                'size': 'invisible',
                'callback': (response) => {
                    sendVerificationCode();
                },
            },
            auth
        );
    };

    // Send SMS code
    const sendVerificationCode = () => {
        setupRecaptcha();
        const appVerifier = window.recaptchaVerifier;

        signInWithPhoneNumber(auth, phoneNumber, appVerifier)
            .then((confirmationResult) => {
                window.confirmationResult = confirmationResult;
                setIsCodeSent(true);
                alert('Verification code sent to your phone!');
            })
            .catch((error) => {
                console.error('Error during sign-in:', error);
            });
    };

    // Verify the entered code
    const verifyCode = () => {
        window.confirmationResult
            .confirm(verificationCode)
            .then((result) => {
                const user = result.user;
                alert('Phone authentication successful!');
                console.log('Authenticated user:', user);
            })
            .catch((error) => {
                console.error('Error verifying code:', error);
                alert('Incorrect verification code.');
            });
    };

    return (
        <div className="phone-auth-container">
            <h2>Phone Authentication</h2>

            {!isCodeSent ? (
                <>
                    <input
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="Enter phone number (+123456789)"
                        className="phone-input"
                    />
                    <button onClick={sendVerificationCode} className="send-code-btn">
                        Send Verification Code
                    </button>
                </>
            ) : (
                <div className="code-verification-section">
                    <input
                        type="text"
                        value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value)}
                        placeholder="Enter verification code"
                        className="code-input"
                    />
                    <button onClick={verifyCode} className="verify-code-btn">
                        Verify Code
                    </button>
                </div>
            )}

            {/* Recaptcha */}
            <div id="recaptcha-container"></div>
        </div>
    );
};

export default PhoneAuth;
