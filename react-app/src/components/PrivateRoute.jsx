import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../context/useAuth"; // Correct import for useAuth

const PrivateRoute = ({ children }) => {
  const { auth } = useAuth(); // Access auth from the context
  const location = useLocation();

  // If there's no auth data, redirect to sign-in page
  if (!auth || !auth.user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If authenticated, render the child components
  return children;
};

export default PrivateRoute;