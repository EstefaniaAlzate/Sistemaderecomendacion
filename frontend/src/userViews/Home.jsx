import React from 'react';
import '../styles/Home.css'; // Importar el archivo de estilos

const Home = () => {
    const infoCards = [
        {
            title: 'Deportes',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            link: "https://www.google.com",
            image: 'https://via.placeholder.com/100' // URL de una imagen de ejemplo
        },
        {
            title: 'Información 2',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            link: "https://example.com",
            image: 'https://via.placeholder.com/100'
        },
        {
            title: 'Información 3',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            link: "https://example.com",
            image: 'https://via.placeholder.com/100'
        },
        {
            title: 'Información 4',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            link: "https://example.com",
            image: 'https://via.placeholder.com/100'
        },
    ];

    const sections = [
        { title: 'Sección 1', content: 'Contenido útil de la sección 1.' },
        { title: 'Sección 2', content: 'Contenido útil de la sección 2.' },
        { title: 'Sección 3', content: 'Contenido útil de la sección 3.' },
        { title: 'Sección 4', content: 'Contenido útil de la sección 4.' },
    ];

    return (
        <div className="home-container">
            <h1>Bienvenido a la Página de Inicio</h1>
            <div className="info-cards">
                {infoCards.map((card, index) => (
                    <a href={card.link} target='_blank' rel='noopener noreferrer' key={index}>
                        <div className="card">
                            <img src={card.image} alt={card.title} className="card-image" />
                            <h2>{card.title}</h2>
                            <p>{card.content}</p>
                        </div>
                    </a>
                ))}
            </div>
            <h2 className="section-title">Información Útil</h2>
            <div className="info-sections">
                {sections.map((section, index) => (
                    <div className="section" key={index}>
                        <h3>{section.title}</h3>
                        <p>{section.content}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
