import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    // If the user is authenticated, render the child components (the protected page)
    // Otherwise, redirect them to the login page
    return token ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
