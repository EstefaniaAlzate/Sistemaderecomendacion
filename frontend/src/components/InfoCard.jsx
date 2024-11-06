// components/InfoCard.jsx
import React, { useState } from 'react';
import { ModalInfoCard } from './Modal'; // Asegúrate de importar el modal
import '../styles/InfoCard.css'; // Asegúrate de tener un archivo CSS para los estilos

const InfoCard = ({ title, content, link, image, schedule = [] }) => { // Valor predeterminado para schedule
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCardClick = () => {
        setIsModalOpen(true); // Abrir modal
    };

    const closeModal = () => {
        setIsModalOpen(false); // Cerrar modal
    };

    return (
        <>
            <div className="card" onClick={handleCardClick}>
                <img src={image} alt={title} className="card-image" />
                <h2>{title}</h2>
            </div>
            {isModalOpen && (
                <ModalInfoCard
                    CerrarModal={closeModal}
                    html={
                        <div>
                            <img src={image} alt={title} className="modal-image" />
                            <h3>{title}</h3>
                            <p>{content}</p>
                            {schedule.length > 0 && (
                                <div className="schedule">
                                    <h4>Horarios:</h4>
                                    <ul>
                                        {schedule.map((item, index) => (
                                            <li className='schedule-list' key={index}>
                                                <a href={item.link} target="_blank" rel="noopener noreferrer">
                                                    {item.time}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            <a href={link} target="_blank" rel="noopener noreferrer">Más Información</a>
                        </div>
                    }
                    width="600px" // Puedes ajustar el ancho como desees
                />
            )}
        </>
    );
};

export default InfoCard;
