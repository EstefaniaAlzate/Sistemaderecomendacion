// controllers/acudeInventoryController.js
import {
  createInventoryEntry,
  getAllInventoryEntries,
} from "../models/acude.js";

// Create a new entry
// Create a new entry
export const createEntry = async (req, res) => {
  const { title, content, link, image, schedule } = req.body;
  const entry = { title, content, link, image, schedule };

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
