import React, { useEffect, useState } from "react";
import { useGetAdmins, useDeleteAdmin } from "../hooks/useUser"; // Asegúrate de importar tus hooks
import UpdateAdmin from "./UpdateAdmin"; // Importa el componente UpdateAdmin
import { ModalForm } from "../components/Modal.jsx"; // Asegúrate de que la ruta sea correcta
import "../styles/AdminInventory.css";

const AdminInventory = () => {
  const [admins, setAdmins] = useState([]);
  const [selectedAdmin, setSelectedAdmin] = useState(null); // Estado para el administrador seleccionado
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para abrir/cerrar el modal

  const fetchAdmins = async () => {
    const adminData = await useGetAdmins();
    if (adminData) {
      setAdmins(adminData);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const handleDelete = async (id) => {
    const response = await useDeleteAdmin(id);
    if (response) {
      setAdmins(admins.filter((admin) => admin.id !== id));
    }
  };

  const handleUpdateClick = (admin) => {
    setSelectedAdmin(admin);
    setIsModalOpen(true); // Abre el modal al hacer clic en actualizar
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedAdmin(null); // Resetea el administrador seleccionado
  };

  const handleUpdate = async (updatedAdmin) => {
    // Actualiza el estado de los administradores
    setAdmins((prevAdmins) =>
      prevAdmins.map((admin) =>
        admin.id === updatedAdmin.id ? updatedAdmin : admin
      )
    );
    closeModal(); // Cierra el modal
  };

  return (
    <div className="admin-inventory">
      <h2>Administradores</h2>
      <table className="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Teléfono</th>
            <th>Dirección</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {admins.map((admin) => (
            <tr key={admin.id}>
              <td>{admin.id}</td>
              <td>{admin.name}</td>
              <td>{admin.email}</td>
              <td>{admin.phone}</td>
              <td>{admin.address}</td>
              <td>
                <div className="butons-container">
                  <button
                    className="btn-update"
                    title="actualizar"
                    onClick={() => handleUpdateClick(admin)}
                  >
                    <span className="material-symbols-outlined">edit</span>
                  </button>
                  <button
                    className="btn-delete"
                    title="borrar"
                    onClick={() => handleDelete(admin.id)}
                  >
                    <span className="material-symbols-outlined">delete</span>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <ModalForm
          CerrarModal={closeModal}
          width="600px"
          html={
            <UpdateAdmin
              admin={selectedAdmin}
              onUpdate={handleUpdate} // Pasa la función de actualización
            />
          }
        />
      )}
    </div>
  );
};

export default AdminInventory;
