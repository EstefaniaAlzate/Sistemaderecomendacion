// ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated, getUserRole } from '../utils/auth';
//saber que tipo usuario esta iniciando la sesion y que tipo de vista mostrar
const ProtectedRoute = ({ children, roles }) => {
    if (!isAuthenticated()) {
        return <Navigate to="/" />; // Redirige a la página principal si no está autenticado
    }

    const userRole = getUserRole();
    if (roles && !roles.includes(userRole)) {
        return <Navigate to="/" />; // Redirige si el rol no está en la lista permitida
    }

    return children;
};

export default ProtectedRoute;
