import React, { useState } from 'react';
import '../styles/Navigator.css'; // Importar el archivo de estilos
import { ModalForm } from './Modal'; // Asegúrate de importar el modal
import LoginUser from "../adminViews/LoginUser.jsx";
import { useNavigate } from 'react-router-dom'; // Importa useNavigate

const Navigator = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const navigate = useNavigate(); // Inicializa useNavigate

    const links = [
        {
            name: <span className="material-symbols-outlined">home</span>,
            action: () => navigate('/') // Usa navigate para la navegación
        },
        {
            name: <span className="material-symbols-outlined">login</span>, action: () => setModalOpen(true) // Agregar el botón para abrir el modal
        }
    ];

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    return (
        <nav className="navigator">
            <div className="logo">
                <img src="https://www.redttu.edu.co/es/wp-content/uploads/2015/12/16.-TDEA.png" alt="" className="nav-logo" />
            </div>
            <ul className="nav-links">
                {links.map((link, index) => (
                    <li key={index} className="nav-item">
                        <button
                            className="nav-link"
                            onClick={link.action} // Usa el action en lugar de href
                        >
                            {link.name}
                        </button>
                    </li>
                ))}
            </ul>
            {isModalOpen && (
                <ModalForm
                    datos={{}} // Aquí puedes pasar los datos que necesites
                    titulo="Título del Modal"
                    CerrarModal={handleCloseModal}
                    html={<LoginUser />} // Contenido del modal
                    width="45%" // Ancho del modal
                    height="100%"
                />
            )}
        </nav>
    );
};

export default Navigator;
