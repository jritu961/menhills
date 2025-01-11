// PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const isAuthenticated = localStorage.getItem('authToken') 

    // If the user is not authenticated, redirect to login page
    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    // Otherwise, render the private component
    return children;
};

export default PrivateRoute;
