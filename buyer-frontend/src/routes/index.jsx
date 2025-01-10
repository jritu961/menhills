import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthProvider'; 

const PrivateRoute = ({ children }) => {
    const { isAuthenticated } = localStorage.getItem("authToken")
    console.log("isAuthenticated",isAuthenticated)
    return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
