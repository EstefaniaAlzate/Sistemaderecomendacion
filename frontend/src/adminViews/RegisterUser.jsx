import React, { useState } from 'react';
import { showSuccessMessage } from "../components/Notifications";
import '../styles/RegisterUser.css'; // Importar el archivo de estilos
import { useRegisterUser } from '../hooks/useUser';
import { useNavigate } from 'react-router';

const RegisterUser = () => {
    const formRef = React.useRef();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        id: '',
        address: '',
        phone: '',
        password: '',
    });
    const [dataSave, setDataSave] = useState();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Agregar manualmente el rol de usuario
        const dataToSubmit = { ...formData, role: "admin" };

        let fetchData = await useRegisterUser(dataToSubmit);

        setDataSave(fetchData);
    };

    if (dataSave && dataSave !== "error") {
        setTimeout(() => {
            showSuccessMessage("Usuario registrado");
            navigate("/")
        }, 800);
    }

    return (
        <div className="register-form-container">
            <img
                src="https://tdea.edu.co/images/tdea/logos/logo-tdea-nuevo.png"
                alt="Logo"
                className="logo"
            />
            <form onSubmit={handleSubmit} className="register-form" ref={formRef}>
                <div className="form-group">
                    <label>Nombre:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Correo:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
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
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Teléfono:</label>
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Contraseña:</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
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
