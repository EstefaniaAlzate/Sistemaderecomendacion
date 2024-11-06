import React from 'react';
import '../styles/LoggedAdmin.css';

const LoggedAdmon = () => {
  const userData = JSON.parse(localStorage.getItem('userData'));

  return (
    <div className="logged-admin-container">
      <aside className="sidebar">
        <div className="user-profile">
          <img
            src="https://via.placeholder.com/150"
            alt="User"
            className="user-image"
          />
          <h2 className="user-name">{userData ? userData.name : 'Nombre de Usuario'}</h2>
          <p className="user-role">{userData ? userData.role : 'Rol de Usuario'}</p>
        </div>
        <div className="user-details">
          <h3>Detalles del Usuario</h3>
          <p><strong>ID:</strong> {userData ? userData.id : 'ID del Usuario'}</p>
          <p><strong>Email:</strong> {userData ? userData.email : 'Email del Usuario'}</p>
          <p><strong>Teléfono:</strong> {userData ? userData.phone : 'Teléfono del Usuario'}</p>
          <p><strong>Dirección:</strong> {userData ? userData.address : 'Dirección del Usuario'}</p>
        </div>
      </aside>
      <main className="user-info">
        <h1>Información del Usuario</h1>
        {/* Agrega más contenido relevante */}
      </main>
    </div>
  );
};

export default LoggedAdmon;
