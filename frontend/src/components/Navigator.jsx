import React from 'react';
import '../styles/Navigator.css'; // Importar el archivo de estilos

const Navigator = () => {
    const links = [
        { name: 'Inicio', href: '/' },
        { name: 'Productos', href: '/productos' },
        { name: 'Servicios', href: '/servicios' },
        { name: 'Contacto', href: '/contacto' },
        { name: 'Acerca de', href: '/acerca' },
    ];

    return (
        <nav className="navigator">
            <div className="logo"><img src="https://www.redttu.edu.co/es/wp-content/uploads/2015/12/16.-TDEA.png" alt="" className="nav-logo" /></div>
            <ul className="nav-links">
                {links.map((link, index) => (
                    <li key={index} className="nav-item">
                        <a href={link.href} className="nav-link">
                            {link.name}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Navigator;
