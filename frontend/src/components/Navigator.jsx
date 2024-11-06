import React, { useState, useEffect } from 'react';
import '../styles/Navigator.css';
import { ModalForm } from './Modal';
import LoginUser from "../adminViews/LoginUser.jsx";
import { useNavigate } from 'react-router-dom';

const Navigator = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('userData'));
        if (userData) {
            setIsAuthenticated(true);
        }
    }, []);

    const handleLoginSuccess = (route) => {
        setIsAuthenticated(true);
        setModalOpen(false);
        navigate(route);
    };

    const handleLogout = () => {
        localStorage.removeItem('userData');
        setIsAuthenticated(false);
        navigate('/');
    };

    const userRole = isAuthenticated ? JSON.parse(localStorage.getItem('userData')).role : null;

    const links = [
        {
            name: <span className="material-symbols-outlined">home</span>,
            action: () => navigate('/'),
            value: "inicio",
        },
        {
            name: isAuthenticated ? (
                <span className="material-symbols-outlined">logout</span>
            ) : (
                <span className="material-symbols-outlined">login</span>
            ),
            action: isAuthenticated ? handleLogout : () => setModalOpen(true),
            value: isAuthenticated ? "salir" : "iniciar sesión"
        },
        // Enlace para el rol admon
        ...(isAuthenticated && userRole === 'admon' ? [
            {
                //perfil de admon
                name: <span class="material-symbols-outlined">supervisor_account </span>,
                action: () => navigate('/loggedAdmon'),
                value: "perfil"
            },
            {
                name: <span className="material-symbols-outlined">inventory</span>,
                action: () => navigate('/adminInventory'), // Nueva ruta para el inventario
                value: "lista de administradores"
            },
            {
                name: <span class="material-symbols-outlined">
                person_add
                </span>,
                action: () => navigate('/registerAdmin'), // Nueva ruta para el inventario
                value: "registrar usuario"
            },
            {
                name: <span class="material-symbols-outlined">
                library_add
                </span>,
                action: () => navigate('/acudeRegister'), // Nueva ruta para el inventario
                value: "Agregar acude"
            },
            {
                name: <span class="material-symbols-outlined">
                inventory
                </span>,
                action: () => navigate('/acudeInventory'), // Nueva ruta para el inventario
                value: "Acudes"
            }
        ] : []),
        ...(isAuthenticated && userRole === 'admin' ? [
            {
                name: <span class="material-symbols-outlined">
                account_circle
                </span>,
                action: () => navigate('/loggedAdmin'),
                value: "perfil"
            },
            {
                name: <span class="material-symbols-outlined">
                library_add
                </span>,
                action: () => navigate('/acudeRegister'), // Nueva ruta para el inventario
                value: "Registrar Acude"
            },
            {
                name: <span class="material-symbols-outlined">
                inventory
                </span>,
                action: () => navigate('/acudeInventory'), // Nueva ruta para el inventario
                value: "Acudes"
            }
        ] : [])
    ];

    return (
        <nav className="navigator">
            <div className="navigator-logo">
                <img src="https://www.redttu.edu.co/es/wp-content/uploads/2015/12/16.-TDEA.png" alt="Logo" className="nav-logo" />
            </div>
            <ul className="nav-links">
                {links.map((link, index) => (
                    <li key={index} className="nav-item" title={link.value}>
                        <button className="nav-link" onClick={link.action}>
                            {link.name}
                        </button>
                    </li>
                ))}
            </ul>
            {isModalOpen && (
                <ModalForm
                    CerrarModal={() => setModalOpen(false)}
                    html={<LoginUser onSuccess={handleLoginSuccess} />}
                    width="45%"
                    height="100%"
                />
            )}
        </nav>
    );
};

export default Navigator;
