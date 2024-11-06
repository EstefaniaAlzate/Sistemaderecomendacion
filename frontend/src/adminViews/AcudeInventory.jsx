// components/AcudeInventory.jsx
import React from 'react';
import { useGetInventoryEntries } from '../hooks/useAcude.js';
import '../styles/AcudeInventory.css';

const AcudeInventory = () => {
  const { entries, loading } = useGetInventoryEntries();

  if (loading) {
    return <div>Cargando...</div>; // Puedes mejorar esta parte con un spinner o un mensaje más atractivo
  }

  const handleEdit = (entryId) => {
    // Aquí podrías redirigir al usuario a una página de edición o abrir un modal de edición
    alert(`Editar entrada con ID: ${entryId}`);
  };

  const handleDelete = (entryId) => {
    // Aquí agregarías la lógica para eliminar el registro del inventario
    alert(`Eliminar entrada con ID: ${entryId}`);
  };

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
            <th>Acciones</th> {/* Columna para botones de acción */}
          </tr>
        </thead>
        <tbody>
          {entries.map((entry) => (
            <tr key={entry.id}>
              <td>{entry.title}</td>
              <td>{entry.content}</td>
              <td><a href={entry.link} target="_blank" rel="noopener noreferrer">{entry.link}</a></td>
              <td><img src={entry.image} alt={entry.title} style={{ width: '50px', height: 'auto' }} /></td>
              <td id='schedule-container'>
                {entry.schedule && entry.schedule.length > 0 ? (
                  <ul>
                    {entry.schedule.map((item, index) => (
                      <li className='schedule-item' key={index}>
                        <a href={item.link} target="_blank" rel="noopener noreferrer">
                          {item.time}
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : (
                  'No hay horarios'
                )}
              </td>
              <td>
                <div className="butons-container">
                  <button
                    className="edit-btn"
                    onClick={() => handleEdit(entry.id)}
                  >
                    <span className="material-symbols-outlined">edit</span>
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(entry.id)}
                  >
                    <span className="material-symbols-outlined">delete</span>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Modal de éxito para la creación o eliminación (ejemplo) */}
    </div>
  );
};

export default AcudeInventory;
