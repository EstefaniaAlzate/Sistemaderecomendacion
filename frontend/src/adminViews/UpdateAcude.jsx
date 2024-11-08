import React, { useState } from "react";
import { useUpdateInventoryEntry } from "../hooks/useAcude"; // Hook para manejar la actualización
import "../styles/UpdateAcude.css";

const UpdateAcude = ({ acude, onUpdate }) => {
  const [formData, setFormData] = useState({
    title: acude.title,
    content: acude.content,
    link: acude.link,
    image: acude.image,
    schedule: acude.schedule || [],
    category: acude.category || '', // Agregado para category
  });

  const { status, handleUpdateEntry } = useUpdateInventoryEntry();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleScheduleChange = (index, field, value) => {
    const newSchedule = formData.schedule.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    );
    setFormData({ ...formData, schedule: newSchedule });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await handleUpdateEntry({ ...formData, id: acude.id });

    if (response) {
      onUpdate({ ...acude, ...formData }); // Llama a onUpdate para actualizar las entradas en AcudeInventory
    }
  };

  return (
    <form className="update-acude-form" onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Título"
        required
      />
      <input
        type="text"
        name="content"
        value={formData.content}
        onChange={handleChange}
        placeholder="Contenido"
        required
      />
      <input
        type="url"
        name="link"
        value={formData.link}
        onChange={handleChange}
        placeholder="Enlace"
        required
      />
      <input
        type="text"
        name="image"
        value={formData.image}
        onChange={handleChange}
        placeholder="URL de la imagen"
      />
      
      {/* Campo de categoría */}
      <div>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        >
          <option value="">Seleccione una categoría</option>
          <option value="Deporte">Deporte</option>
          <option value="Cultura">Cultura</option>
        </select>
      </div>

      {formData.schedule.map((item, index) => (
        <div key={index} className="schedule-item">
          <input
            type="text"
            placeholder="Hora"
            value={item.time}
            onChange={(e) =>
              handleScheduleChange(index, "time", e.target.value)
            }
          />
          <input
            type="url"
            placeholder="Link"
            value={item.link}
            onChange={(e) =>
              handleScheduleChange(index, "link", e.target.value)
            }
          />
        </div>
      ))}
      <button type="submit">Actualizar</button>
    </form>
  );
};

export default UpdateAcude;
