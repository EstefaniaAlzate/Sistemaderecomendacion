import React from 'react';
import '../styles/LoggedAdmin.css';

const LoggedAdmin = () => {
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
      
      <section className="manual-section">
        <h2>Manual de Usuario</h2>
        <div className="manual-item">
          <span className="material-symbols-outlined">home</span>
          <p><strong>Inicio:</strong> Accede a la página principal de la aplicación.</p>
        </div>
        <div className="manual-item">
          <span className="material-symbols-outlined">description</span>
          <p><strong>Encuesta:</strong> Realiza una encuesta para recibir recomendaciones de actividades.</p>
        </div>
        <div className="manual-item">
          <span className="material-symbols-outlined">supervisor_account</span>
          <p><strong>Perfil:</strong> Visualiza tus datos personales y rol en la aplicación.</p>
        </div>
        <div className="manual-item">
          <span className="material-symbols-outlined">inventory</span>
          <p><strong>Lista de Administradores:</strong> Administra la lista de usuarios con permisos administrativos.</p>
        </div>
        <div className="manual-item">
          <span className="material-symbols-outlined">person_add</span>
          <p><strong>Registrar Usuario:</strong> Crea un nuevo usuario con permisos específicos.</p>
        </div>
        <div className="manual-item">
          <span className="material-symbols-outlined">inventory_2</span>
          <p><strong>Acudes:</strong> Accede al inventario de actividades.</p>
        </div>
        <div className="manual-item">
          <span className="material-symbols-outlined">library_add</span>
          <p><strong>Agregar Acude:</strong> Añade una nueva actividad o evento a la lista de acudes.</p>
        </div>
      </section>
    </div>
  );
};

export default LoggedAdmin;
