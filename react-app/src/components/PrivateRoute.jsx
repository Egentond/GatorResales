import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../context/UseAuth'; // Import your custom hook to access auth context

const PrivateRoute = ({ children }) => {
  const { auth } = useAuth(); // Get the auth state
  const location = useLocation();

  // If there's no auth data, redirect to sign-in page
  if (!auth || !auth.user) {
    return <Navigate to="/sign-in" state={{ from: location }} replace />;
  }

  // If authenticated, render the child components
  return children;
};

export default PrivateRoute;