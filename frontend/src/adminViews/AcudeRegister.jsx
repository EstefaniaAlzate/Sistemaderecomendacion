import React, { useState } from 'react';
import "../styles/AcudeRegister.css";
import { useRegisterInventory } from '../hooks/useAcude.js';
import { ModalForm } from '../components/Modal.jsx';
import { useNavigate } from 'react-router-dom';

const AcudeRegister = () => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    link: 'https://www.tdea.edu.co/index.php/informate/medios-tdea/valla-virtual/4688-acude-2024-2',
    image: '',
    schedule: [],
    category: '',
  });
  const [tempSchedule, setTempSchedule] = useState('');
  const [tempLink, setTempLink] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const addSchedule = () => {
    if (tempSchedule && tempLink) {
      setFormData({
        ...formData,
        schedule: [...formData.schedule, { time: tempSchedule, link: tempLink }]
      });
      setTempSchedule('');
      setTempLink('');
    }
  };

  const removeSchedule = (index) => {
    const updatedSchedule = formData.schedule.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      schedule: updatedSchedule
    });
  };

  const generateWeights = (acudeData) => {
    const weights = {
      horario: 0,
      modalidad: 0,
      dependencies: 0
    };

    // Peso para horario
    const scheduleCount = acudeData.schedule.length;
    weights.horario = Math.min(scheduleCount * 0.2, 1).toFixed(2);

    // Peso para modalidad
    switch (acudeData.category.toLowerCase()) {
      case 'deporte':
        weights.modalidad = 0.8.toFixed(2);
        break;
      case 'cultura':
        weights.modalidad = 0.6.toFixed(2);
        break;
      default:
        weights.modalidad = 0.4.toFixed(2);
    }

    // Peso para dependencies
    const contentLength = acudeData.content.length;
    weights.dependencies = Math.min(contentLength / 300, 1).toFixed(2);

    return weights;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.content || !formData.link || !formData.image || !formData.category) {
      alert('Todos los campos son obligatorios. Por favor, complete todos los campos.');
      return;
    }

    if (formData.schedule.length === 0) {
      alert('Debe agregar al menos un horario.');
      return;
    }

    const weights = generateWeights(formData);
    const finalData = {
      ...formData,
      weights
    };

    console.log('Formulario enviado:', finalData);

    const result = await useRegisterInventory(finalData);

    if (result) {
      setModalContent('El inventario se ha registrado correctamente.');
      setShowModal(true);

      setTimeout(() => {
        navigate('/acudeInventory');
      }, 2000);
    } else {
      alert('Hubo un error al registrar el inventario');
    }
  };

  const cerrarModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="acude-inventory-form">
        <div>
          <label htmlFor="title">Nombre:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="content">Contenido:</label>
         
          <input
            type="text"
            id="content"
            name="content"
            value={formData.content}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="image">Imagen URL:</label>
          <input
            type="url"
            id="image"
            name="image"
            value={formData.image}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="category">Categoría:</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            required
          >
            <option value="">Seleccione una categoría</option>
            <option value="Deporte">Deporte</option>
            <option value="Cultura">Cultura</option>
          </select>
        </div>
        <div>
          <label>Horario:</label>
          <div className="schedule-input">
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
            />
            <button type="button" onClick={addSchedule} className="add-schedule">
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
                  className="remove-schedule"
                >
                  x
                </button>
              </li>
            ))}
          </ul>
        </div>
        <button type="submit">Enviar</button>
      </form>

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