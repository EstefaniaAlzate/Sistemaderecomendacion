import React, { useState } from "react";
import { useUpdateAdmin } from "../hooks/useUser.js"; // Hook para manejar la actualización
import "../styles/UpdateAdmin.css"; // Asegúrate de importar el archivo CSS

const UpdateAdmin = ({ admin, onUpdate }) => {
  const [formData, setFormData] = useState({
    id: admin.id,
    name: admin.name,
    email: admin.email,
    phone: admin.phone,
    address: admin.address,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await useUpdateAdmin(formData);
    if (response) {
      onUpdate(formData); // Llama a la función de actualización y pasa el admin actualizado
    }
  };

  return (
    <form className="update-admin-form" onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Nombre"
        required
      />
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        required
      />
      <input
        type="text"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        placeholder="Teléfono"
        required
      />
      <input
        type="text"
        name="address"
        value={formData.address}
        onChange={handleChange}
        placeholder="Dirección"
        required
      />
      <button type="submit">Actualizar</button>
    </form>
  );
};

export default UpdateAdmin;
