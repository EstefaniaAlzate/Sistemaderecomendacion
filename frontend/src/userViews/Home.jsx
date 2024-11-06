// userViews/Home.jsx
import React from 'react';
import '../styles/Home.css';
import InfoCard from '../components/InfoCard.jsx';
import { useGetInventoryEntries } from '../hooks/useAcude.js';

const Home = () => {
    const { entries, loading } = useGetInventoryEntries();
    console.log(entries)
    const sections = [
        { title: 'Sección 1', content: 'Contenido útil de la sección 1.' },
        { title: 'Sección 2', content: 'Contenido útil de la sección 2.' },
        { title: 'Sección 3', content: 'Contenido útil de la sección 3.' },
        { title: 'Sección 4', content: 'Contenido útil de la sección 4.' },
    ];
    const infoCards = [
        {
            title: 'Yoga',
            content: 'Clase de yoga para principiantes y avanzados.',
            link: 'https://example.com/yoga',
            image: 'https://via.placeholder.com/150/8e44ad/FFFFFF?text=Yoga',
            schedule: ['Lunes: 8:00-9:00 AM', 'Miércoles: 6:00-7:00 PM'],
        },
        {
            title: 'Pilates',
            content: 'Ejercicios de pilates para mejorar la postura.',
            link: 'https://example.com/pilates',
            image: 'https://via.placeholder.com/150/3498db/FFFFFF?text=Pilates',
            schedule: ['Martes: 10:00-11:00 AM', 'Jueves: 5:00-6:00 PM'],
        },
        {
            title: 'Baile Urbano',
            content: 'Clase de baile urbano para todas las edades.',
            link: 'https://example.com/baileurbano',
            image: 'https://via.placeholder.com/150/e74c3c/FFFFFF?text=Baile+Urbano',
            schedule: ['Viernes: 6:00-7:30 PM', 'Sábado: 2:00-3:30 PM'],
        },
        {
            title: 'Natación',
            content: 'Clases de natación en piscina olímpica.',
            link: 'https://example.com/natacion',
            image: 'https://via.placeholder.com/150/1abc9c/FFFFFF?text=Natacion',
            schedule: ['Lunes a Viernes: 9:00-10:00 AM'],
        },
        {
            title: 'Boxeo',
            content: 'Entrenamiento de boxeo intensivo.',
            link: 'https://example.com/boxeo',
            image: 'https://via.placeholder.com/150/f39c12/FFFFFF?text=Boxeo',
            schedule: ['Lunes, Miércoles, Viernes: 7:00-8:00 PM'],
        },
        {
            title: 'Karate',
            content: 'Aprende Karate desde nivel básico.',
            link: 'https://example.com/karate',
            image: 'https://via.placeholder.com/150/9b59b6/FFFFFF?text=Karate',
            schedule: ['Martes, Jueves: 5:00-6:30 PM'],
        },
        {
            title: 'Fotografía',
            content: 'Curso de fotografía para principiantes.',
            link: 'https://example.com/fotografia',
            image: 'https://via.placeholder.com/150/34495e/FFFFFF?text=Fotografia',
            schedule: ['Sábados: 10:00-12:00 PM'],
        },
        {
            title: 'Pintura',
            content: 'Explora tu creatividad en pintura al óleo.',
            link: 'https://example.com/pintura',
            image: 'https://via.placeholder.com/150/e67e22/FFFFFF?text=Pintura',
            schedule: ['Jueves: 4:00-6:00 PM'],
        },
        {
            title: 'Guitarra',
            content: 'Curso de guitarra para todos los niveles.',
            link: 'https://example.com/guitarra',
            image: 'https://via.placeholder.com/150/2980b9/FFFFFF?text=Guitarra',
            schedule: ['Lunes, Miércoles: 5:00-6:00 PM'],
        },
        {
            title: 'Piano',
            content: 'Aprende piano con técnicas modernas.',
            link: 'https://example.com/piano',
            image: 'https://via.placeholder.com/150/27ae60/FFFFFF?text=Piano',
            schedule: ['Viernes: 3:00-5:00 PM'],
        },
        {
            title: 'Cocina Internacional',
            content: 'Clases de cocina internacional para amantes de la gastronomía.',
            link: 'https://example.com/cocina',
            image: 'https://via.placeholder.com/150/c0392b/FFFFFF?text=Cocina+Int',
            schedule: ['Sábados: 11:00-1:00 PM'],
        },
        {
            title: 'Pastelería',
            content: 'Curso de pastelería y repostería avanzada.',
            link: 'https://example.com/pasteleria',
            image: 'https://via.placeholder.com/150/16a085/FFFFFF?text=Pasteleria',
            schedule: ['Martes: 10:00-12:00 PM'],
        },
        {
            title: 'Escalada',
            content: 'Clase de escalada en roca para principiantes.',
            link: 'https://example.com/escalada',
            image: 'https://via.placeholder.com/150/8e44ad/FFFFFF?text=Escalada',
            schedule: ['Viernes: 3:00-5:00 PM'],
        },
        {
            title: 'Senderismo',
            content: 'Salida de senderismo en la naturaleza.',
            link: 'https://example.com/senderismo',
            image: 'https://via.placeholder.com/150/2ecc71/FFFFFF?text=Senderismo',
            schedule: ['Domingos: 8:00 AM-2:00 PM'],
        },
        {
            title: 'Ciclismo',
            content: 'Ruta de ciclismo de montaña para todos los niveles.',
            link: 'https://example.com/ciclismo',
            image: 'https://via.placeholder.com/150/3498db/FFFFFF?text=Ciclismo',
            schedule: ['Domingos: 7:00 AM-1:00 PM'],
        },
        {
            title: 'Fotografía Nocturna',
            content: 'Curso de fotografía nocturna en exteriores.',
            link: 'https://example.com/fotonoche',
            image: 'https://via.placeholder.com/150/1abc9c/FFFFFF?text=Fotografia+Nocturna',
            schedule: ['Sábados: 8:00-10:00 PM'],
        },
        {
            title: 'Cerámica',
            content: 'Curso de cerámica y alfarería.',
            link: 'https://example.com/ceramica',
            image: 'https://via.placeholder.com/150/34495e/FFFFFF?text=Ceramica',
            schedule: ['Jueves: 3:00-5:00 PM'],
        },
        {
            title: 'Idiomas',
            content: 'Clases de idiomas: inglés, francés y alemán.',
            link: 'https://example.com/idiomas',
            image: 'https://via.placeholder.com/150/e67e22/FFFFFF?text=Idiomas',
            schedule: ['Lunes a Viernes: 5:00-6:00 PM'],
        },
        {
            title: 'Ajedrez',
            content: 'Taller de ajedrez para principiantes y avanzados.',
            link: 'https://example.com/ajedrez',
            image: 'https://via.placeholder.com/150/9b59b6/FFFFFF?text=Ajedrez',
            schedule: ['Sábados: 10:00-12:00 PM'],
        },
        {
            title: 'Teatro',
            content: 'Curso de teatro para niños y adultos.',
            link: 'https://example.com/teatro',
            image: 'https://via.placeholder.com/150/f39c12/FFFFFF?text=Teatro',
            schedule: ['Martes y Jueves: 5:00-7:00 PM'],
        }
    ];


    return (
        <div className="home-container">
            <h1>Bienvenido a la Página de Inicio</h1>
            <div className="info-cards">
                {entries.map((card, index) => (
                    <InfoCard
                        key={index}
                        title={card.title}
                        content={card.content}
                        link={card.link}
                        image={card.image}
                        schedule={card.schedule}
                    />
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
