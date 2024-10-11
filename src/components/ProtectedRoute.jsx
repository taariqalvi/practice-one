import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebaseConfig";

const ProtectedRoute = ({ children }) => {
  const [user] = useAuthState(auth);

  return user ? children : <Navigate to="/signin" />;
};

export default ProtectedRoute;
