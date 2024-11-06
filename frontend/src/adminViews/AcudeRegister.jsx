import React, { useState } from 'react';
import "../styles/AcudeRegister.css";
import { useRegisterInventory } from '../hooks/useAcude.js';
import { ModalForm } from '../components/Modal.jsx'; // Importar el componente ModalForm
import { useNavigate } from 'react-router-dom'; // Importar el hook useNavigate

const AcudeRegister = () => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    link: 'https://www.tdea.edu.co/index.php/informate/medios-tdea/valla-virtual/4688-acude-2024-2',
    image: '',
    schedule: []  // Aquí se almacenarán los horarios y links
  });
  const [tempSchedule, setTempSchedule] = useState(''); // Almacena el horario temporalmente
  const [tempLink, setTempLink] = useState(''); // Almacena el enlace temporalmente para cada horario
  const [response, setResponse] = useState(null); // Para manejar la respuesta del servidor
  const [showModal, setShowModal] = useState(false); // Controla si el modal se debe mostrar
  const [modalContent, setModalContent] = useState(''); // El contenido dinámico del modal
  const navigate = useNavigate(); // Hook para la redirección

  // Maneja el cambio en los inputs del formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Añade un horario y su enlace al arreglo de horarios
  const addSchedule = () => {
    if (tempSchedule && tempLink) {
      setFormData({
        ...formData,
        schedule: [...formData.schedule, { time: tempSchedule, link: tempLink }]
      });
      setTempSchedule(''); // Limpia el input temporal de horario
      setTempLink(''); // Limpia el input temporal de enlace
    }
  };

  // Elimina un horario del arreglo de horarios
  const removeSchedule = (index) => {
    const updatedSchedule = formData.schedule.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      schedule: updatedSchedule
    });
  };

  // Maneja el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación de los campos del formulario
    if (!formData.title || !formData.content || !formData.link || !formData.image) {
      alert('Todos los campos son obligatorios. Por favor, complete todos los campos.');
      return; // Evita el envío si algún campo está vacío
    }

    if (formData.schedule.length === 0) {
      alert('Debe agregar al menos un horario.');
      return; // Evita el envío si no se han agregado horarios
    }

    console.log('Formulario enviado:', formData);

    // Usar el hook para registrar la entrada
    const result = await useRegisterInventory(formData);
    setResponse(result); // Guarda la respuesta del servidor

    if (result) {
      // Mostrar el modal de éxito con ModalForm
      setModalContent('El inventario se ha registrado correctamente.');
      setShowModal(true);

      // Redirigir a /acudeInventory después de un registro exitoso
      setTimeout(() => {
        navigate('/acudeInventory'); // Redirige a la vista de AcudeInventory
      }, 2000); // Espera 2 segundos antes de redirigir
    } else {
      alert('Hubo un error al registrar el inventario');
    }
  };

  // Función para cerrar el modal
  const cerrarModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="acude-inventory-form">
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Contenido:</label>
          <input
            type="text"
            name="content"
            value={formData.content}
            onChange={handleInputChange}
          />
        </div>
        {/* <div>
          <label>Link:</label>
          <input
            type="url"
            name="link"
            value={formData.link}
            onChange={handleInputChange}
          />
        </div> */}
        <div>
          <label>Imagen URL:</label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Horario:</label>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <input
              type="text"
              value={tempSchedule}
              onChange={(e) => setTempSchedule(e.target.value)}
              placeholder="Agregar horario"
            />
            <input
              type="url"
              value={tempLink}
              onChange={(e) => setTempLink(e.target.value)}
              placeholder="Agregar enlace"
              style={{ marginLeft: '10px' }}
            />
            <button type="button" onClick={addSchedule} style={{ marginLeft: '10px' }}>
              +
            </button>
          </div>
          <ul className="schedule-list">
            {formData.schedule.map((item, index) => (
              <li key={index}>
                {item.time}{' '}
                <a href={item.link} target="_blank" rel="noopener noreferrer">
                  (Ver)
                </a>
                <button
                  type="button"
                  onClick={() => removeSchedule(index)}
                  style={{ marginLeft: '10px', color: 'red', cursor: 'pointer', border: 'none', background: 'transparent' }}
                >
                  x
                </button>
              </li>
            ))}
          </ul>
        </div>
        <button type="submit">Enviar</button>
      </form>

      {/* Mostrar el modal de éxito si showModal es true */}
      {showModal && (
        <ModalForm
          CerrarModal={cerrarModal}
          html={modalContent}
          width="400px"
        />
      )}
    </>
  );
};

export default AcudeRegister;
