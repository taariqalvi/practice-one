// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBhHze8nXHywj7DtQi9MvKzqqI4t8LLNxA",
    authDomain: "fir-demo-practice-150b2.firebaseapp.com",
    projectId: "fir-demo-practice-150b2",
    storageBucket: "fir-demo-practice-150b2.appspot.com",
    messagingSenderId: "851230917256",
    appId: "1:851230917256:web:326aad9b893722d5b5553d",
    measurementId: "G-6H4FP5HNMX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const auth = getAuth(app);

export { auth };