// models/acudeInventoryModel.js
import { database } from "../database/database.js";

// modelo para crear un nuevo acude
export const createInventoryEntry = async (entry) => {
  const values = [entry.title, entry.content, entry.link, entry.image, JSON.stringify(entry.schedule), entry.category , JSON.stringify(entry.weights)];
  const query = 'INSERT INTO acude_inventory (title, content, link, image, schedule , category , weights) VALUES ($1, $2, $3, $4, $5, $6 , $7) RETURNING *'; // Agregado RETURNING para ver la fila creada

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

// modelo para traer todos los datos de la base de datos
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


//modelo para eliminar el usuario

export const deleteInventoryEntry = async (id) => {
  const query = 'DELETE FROM acude_inventory WHERE id = $1';

  try {
    const connection = await database.connect();
    const result = await connection.query(query, [id]);
    await connection.release();
    return result.rowCount > 0; // Devuelve true si se eliminó alguna fila, false en caso contrario
  } catch (e) {
    console.error("Error al eliminar la entrada:", e);
    return null;
  }
};

//modelo para actualizar datos en la base da datos
export const updateInventoryEntry = async (id, entry) => {
  const values = [entry.title, entry.content, entry.link, entry.image, JSON.stringify(entry.schedule), entry.category, id];
  const query = `
    UPDATE acude_inventory
    SET title = $1, content = $2, link = $3, image = $4, schedule = $5, category= $6
    WHERE id = $7
    RETURNING *`; // Usamos RETURNING * para devolver la entrada actualizada

  try {
    const connection = await database.connect();
    const { rows } = await connection.query(query, values);
    await connection.release();
    return rows[0]; // Retorna la entrada actualizada
  } catch (e) {
    console.error("Error al actualizar la entrada:", e);
    return null;
  }
};
