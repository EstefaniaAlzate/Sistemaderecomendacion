import React, { useState } from "react";
import "../styles/LoginUser.css";
import { useLogUser } from "../hooks/useUser.js";
import { showSuccessMessage, showErrorMessage } from "../components/Notifications";

const LoginUser = ({ onSuccess }) => {
  const formRef = React.useRef();
  const [dataSession, setDataSession] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    const data = Object.fromEntries(formData);

    console.log("Datos enviados para login:", data);

    let fetchData = await useLogUser(data);
    console.log("Datos del fetch:", JSON.stringify(fetchData, null, 2));

    if (fetchData === "error") {
      console.error("Error al iniciar sesión:", fetchData);
      showErrorMessage("Error al iniciar sesión");
      return;
    }

    // Guarda todos los datos del usuario en localStorage
    localStorage.setItem('userData', JSON.stringify(fetchData.response));

    const role = fetchData.response.role;
    if (role) {
      setTimeout(() => {
        if (role === "admin") {
          showSuccessMessage("Admin Logged");
          onSuccess("/loggedAdmin");
        } else if (role === "admon") {
          showSuccessMessage("User Logged");
          onSuccess("/loggedAdmon");
        }
      }, 1000);
    }
  };

  return (
    <div className="form-container">
      <img
        src="https://www.redttu.edu.co/es/wp-content/uploads/2015/12/16.-TDEA.png"
        alt="Logo"
        className="logo"
      />
      <form className="login-form" onSubmit={handleSubmit} ref={formRef}>
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
          <button type="submit" className="submit-button">
            Iniciar Sesión
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginUser;
