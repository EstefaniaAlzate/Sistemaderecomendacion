import React, { useState } from 'react';
import '../styles/LoginUser.css'; // Importar el archivo de estilos
import { useLoginUser } from '../hooks/useUser.js'; // Asegúrate de que esta función esté definida correctamente

const LoginUser = () => {
    const formRef = React.useRef();
    const [dataSave, setDataSave] = useState();
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(formRef.current);
        const data = Object.fromEntries(formData);

        let fetchData = await useLoginUser(data);
        setDataSave(fetchData);
    };

    if (dataSave && dataSave !== "error") {
        setTimeout(() => {
            alert("Inicio de sesión exitoso");
        }, 800);
    }

    return (
        <div className="form-container">
            <img
                src="https://www.redttu.edu.co/es/wp-content/uploads/2015/12/16.-TDEA.png"
                alt="Logo"
                className="logo"
            />
            <form onSubmit={handleSubmit} className="login-form" ref={formRef}>
                <div className="form-group">
                    <label>ID:</label>
                    <input
                        type="text"
                        name="id"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Contraseña:</label>
                    <input
                        type="password"
                        name="password"
                        required
                    />
                </div>
                <div className="submit-button-container">
                    <button type="submit" className="submit-button">Iniciar Sesión</button>
                </div>
            </form>
        </div>
    );
};

export default LoginUser;
