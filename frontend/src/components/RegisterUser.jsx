import React, { useState } from 'react';
import '../styles/RegisterUser.css'; // Importar el archivo de estilos

const RegisterUser = () => {
    const [formData, setFormData] = useState({
        nombre: '',
        correo: '',
        id: '',
        direccion: '',
        telefono: '',
        contraseña: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Datos del formulario:', formData);
        // Aquí puedes agregar la lógica para enviar los datos al servidor
    };

    return (
        <div className="form-container">
            <img
                src="https://www.redttu.edu.co/es/wp-content/uploads/2015/12/16.-TDEA.png"
                alt="Logo"
                className="logo"
            />
            <form onSubmit={handleSubmit} className="register-form">
                <div className="form-group">
                    <label>Nombre:</label>
                    <input
                        type="text"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Correo:</label>
                    <input
                        type="email"
                        name="correo"
                        value={formData.correo}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>ID:</label>
                    <input
                        type="text"
                        name="id"
                        value={formData.id}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Dirección:</label>
                    <input
                        type="text"
                        name="direccion"
                        value={formData.direccion}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Teléfono:</label>
                    <input
                        type="tel"
                        name="telefono"
                        value={formData.telefono}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Contraseña:</label>
                    <input
                        type="password"
                        name="contraseña"
                        value={formData.contraseña}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="submit-button-container">
                    <button type="submit" className="submit-button">Registrar</button>
                </div>
            </form>
        </div>
    );
};

export default RegisterUser;
