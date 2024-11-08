import React, { useState, useEffect } from "react";
import { useGetInventoryEntries, useDeleteInventoryEntry } from "../hooks/useAcude.js";
import UpdateAcude from "./UpdateAcude";
import { ModalForm } from "../components/Modal.jsx";
import "../styles/AcudeInventory.css";

const AcudeInventory = () => {
  const { entries, loading } = useGetInventoryEntries();
  const { status, handleDelete } = useDeleteInventoryEntry();
  const [selectedAcude, setSelectedAcude] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updatedEntries, setUpdatedEntries] = useState(entries); // Estado para las entradas actualizadas

  useEffect(() => {
    setUpdatedEntries(entries); // Actualiza las entradas cuando cambian
  }, [entries]);

  const handleUpdateClick = (acude) => {
    setSelectedAcude(acude);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedAcude(null);
  };

  const handleUpdate = (updatedAcude) => {
    setUpdatedEntries((prevEntries) =>
      prevEntries.map((entry) =>
        entry.id === updatedAcude.id ? updatedAcude : entry
      )
    );
    closeModal();
  };

  const handleDeleteClick = (entryId) => {
    handleDelete(entryId)
      .then(() => {
        // Si la eliminación fue exitosa, actualizamos las entradas en el estado
        setUpdatedEntries((prevEntries) => prevEntries.filter((entry) => entry.id !== entryId));
      })
      .catch(() => {
        // Manejo de errores si la eliminación falla
        console.error("Error al eliminar la entrada");
      });
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="acude-inventory">
      <h1>Inventario de Acude</h1>
      <table className="inventory-table">
        <thead>
          <tr>
            <th>Título</th>
            <th>Contenido</th>
            <th>Link</th>
            <th>Imagen</th>
            <th>Horario</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {updatedEntries.map((entry) => (
            <tr key={entry.id}>
              <td>{entry.title}</td>
              <td>{entry.content}</td>
              <td>
                <a href={entry.link} target="_blank" rel="noopener noreferrer">
                  {entry.link}
                </a>
              </td>
              <td>
                <img
                  src={entry.image}
                  alt={entry.title}
                  style={{ width: "50px", height: "auto" }}
                />
              </td>
              <td>
                <ul id="cambios">
                  {entry.schedule?.map((item, index) => (
                    <li key={index}>
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {item.time}
                      </a>
                    </li>
                  ))}
                </ul>
              </td>
              <td>
                <div className="buttons-container">
                  <button
                    className="edit-btn"
                    onClick={() => handleUpdateClick(entry)}
                  >
                    <span className="material-symbols-outlined">edit</span>
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDeleteClick(entry.id)}
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
          html={<UpdateAcude acude={selectedAcude} onUpdate={handleUpdate} />}
        />
      )}

    </div>
  );
};

export default AcudeInventory;
