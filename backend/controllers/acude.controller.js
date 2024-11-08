// controllers/acudeInventoryController.js
import {
  createInventoryEntry,
  deleteInventoryEntry,
  getAllInventoryEntries,
  updateInventoryEntry,
} from "../models/acude.js";

// Create a new entry
// Create a new entry
export const createEntry = async (req, res) => {
  const { title, content, link, image, schedule, category, weights } = req.body;
  const entry = { title, content, link, image, schedule,category, weights};

  try {
    const newEntry = await createInventoryEntry(entry);
    if (newEntry) {
      // Enviar el nuevo objeto de entrada que se guardó en la base de datos
      res.status(201).json(newEntry); // Responder con el objeto de la nueva entrada creada
    } else {
      res.status(500).json({ message: 'Failed to create inventory entry.' });
    }
  } catch (error) {
    console.error('Error al crear entrada:', error);
    res.status(500).json({ message: 'Internal server error' }); // Manejo de errores en caso de fallos inesperados
  }
};

// Get all entries
export const getEntries = async (req, res) => {
  const entries = await getAllInventoryEntries();
  if (entries.length) {
    res.status(200).json(entries);
  } else {
    res.status(500).json({ message: "Failed to retrieve entries." });
  }
};

//controlador para eliminar el usuario

export const deleteEntry = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await deleteInventoryEntry(id);
    if (result) {
      res.status(200).json({ message: 'Entrada eliminada correctamente.' });
    } else {
      res.status(404).json({ message: 'Entrada no encontrada.' });
    }
  } catch (error) {
    console.error('Error al eliminar entrada:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};
export const updateEntry = async (req, res) => {
  const { id } = req.params;
  const { title, content, link, image, schedule, category } = req.body;
  const updatedEntry = { title, content, link, image, schedule,category };

  try {
    const result = await updateInventoryEntry(id, updatedEntry);
    if (result) {
      res.status(200).json({ message: 'Entrada actualizada correctamente.', updatedEntry: result });
    } else {
      res.status(404).json({ message: 'Entrada no encontrada.' });
    }
  } catch (error) {
    console.error('Error al actualizar entrada:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

