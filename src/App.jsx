import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import Home from "./components/Home";
import AuthProvider from "./components/AuthProvider";
import Navigation from "./components/Navigation";
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css";
import PhoneAuth from "./components/PhoneAuth";

const App = () => {
  return (
    <Router>
      <AuthProvider>
      <Navigation />       
        <div>
          <h1>Firebase Authentication</h1>
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/phoneauth" element={<PhoneAuth />} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
};

export default App;
