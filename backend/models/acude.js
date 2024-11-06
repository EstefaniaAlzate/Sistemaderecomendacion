// models/acudeInventoryModel.js
import { database } from "../database/database.js";

// Create a new inventory entry
export const createInventoryEntry = async (entry) => {
  const values = [entry.title, entry.content, entry.link, entry.image, JSON.stringify(entry.schedule)];
  const query = 'INSERT INTO acude_inventory (title, content, link, image, schedule) VALUES ($1, $2, $3, $4, $5) RETURNING *'; // Agregado RETURNING para ver la fila creada

  try {
    console.log('Valores a insertar:', values); // Verifica qué valores estás enviando
    const connection = await database.connect();
    const { rows } = await connection.query(query, values);
    await connection.release();
    console.log('Fila insertada:', rows[0]); // Muestra la fila insertada
    return rows[0];
  } catch (e) {
    console.error("Error en la inserción:", e);
    return null;
  }
};

// Retrieve all inventory entries
export const getAllInventoryEntries = async () => {
  const query = 'SELECT * FROM acude_inventory';

  try {
    const connection = await database.connect();
    const { rows } = await connection.query(query);
    // console.log(rows)
    await connection.release();
    return rows;
  } catch (e) {
    console.error("Error retrieving inventory entries:", e);
    return [];
  }
};


