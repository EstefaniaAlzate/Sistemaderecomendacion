import React from 'react';
import "../styles/Home.css"
const Home = () => {
    return (
        <div className="home-container">
            <header className="home-header">
                <h1>Bienvenido a nuestra Aplicación</h1>

            </header>
            <main className="home-content">
                <section>
                    <h2>¿Qué ofrecemos?</h2>
                    <p>
                        Aquí puedes gestionar tus usuarios, realizar acciones y acceder a diversas funcionalidades.
                    </p>
                </section>
                <section>
                    <h2>Contacto</h2>
                    <p>
                        Para más información, por favor contáctanos a través de nuestro correo electrónico.
                    </p>
                </section>
            </main>
            <footer className="home-footer">
                <p>&copy; 2024 Tu Empresa. Todos los derechos reservados.</p>
            </footer>
        </div>
    );
};

export default Home;
