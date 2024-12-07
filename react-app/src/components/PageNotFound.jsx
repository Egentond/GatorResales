import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => { // Page not found component
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-6xl font-bold text-red-600 mb-4">404</h1>
      <p className="text-2xl text-gray-800 mb-6">
        Oops! The page you're looking for doesn't exist.
      </p>

      <Link // Go back home button
        to="/"
        className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-300 ease-in-out"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default PageNotFound;
