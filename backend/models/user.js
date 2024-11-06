import { database } from "../database/database.js";

export const createUser = async (user) => {
  const values = [user.id, user.name, user.encriptedPassword, user.role, user.email, user.phone, user.address];
  const query = 'INSERT INTO usuarios (id, name, "password", "role", email, phone, address) values ($1,$2, $3, $4, $5, $6, $7)';

  try {
    const connection = await database.connect();
    const { rows } = await connection.query(query, values);
    await connection.release();
    return rows;
  } catch (e) {
    console.log("Error al registrar usuario" + e);
    return null;
  }
};

// export const updateUser = async (user) => {
//   const values = [user.id, user.name, user.encriptedPassword, user.role, user.email, user.phone, user.address];
//   const query = 'INSERT INTO usuarios (id, name, "password", "role", email, phone, address) values ($1,$2, $3, $4, $5, $6, $7)';

//   try {
//     const connection = await database.connect();
//     const { rows } = await connection.query(query, values);
//     await connection.release();
//     console.log(rows);
//     return rows;
//   } catch (e) {
//     console.log("error-----" + e);
//     return null;
//   }
// };

export const loginUser = async (user) => {
  const values = [user.id];
  const query = 'SELECT id, name, password, role, email, phone, address FROM usuarios WHERE id = $1';

  try {
    const connection = await database.connect();
    const { rows } = await connection.query(query, values);
    await connection.release();

    if (rows.length === 0) {
      return null; // No se encontró el usuario
    }
    return rows[0]; // Devuelve el primer resultado con todos los campos
  } catch (e) {
    console.error("Error en loginUser:", e);
    return null;
  }
};

//modelo para traer los administradores
export const getAllAdmins = async () => {
  const query = 'SELECT id, name, role, email, phone, address FROM usuarios WHERE role = $1';
  const values = ['admin'];

  try {
    const connection = await database.connect();
    const { rows } = await connection.query(query, values);
    await connection.release();
    
    return rows; // Retorna la lista de administradores
  } catch (e) {
    console.error("Error al obtener administradores:", e);
    return null;
  }
};
//modelo para eliminar al administrador 
export const deleteAdminFromDatabase = async (id) => {
  const query = 'DELETE FROM usuarios WHERE id = $1';
  const values = [id];

  try {
    const connection = await database.connect();
    await connection.query(query, values);
    await connection.release();
    return true; // Retorna true si la eliminación fue exitosa
  } catch (e) {
    console.error("Error al eliminar el administrador:", e);
    return false; // Retorna false si hubo un error
  }
};

// Método para actualizar un administrador
export const updateAdminInDatabase = async (admin) => {
  const values = [admin.name, admin.email, admin.phone, admin.address, admin.id]; // Modifica los campos que desees actualizar
  const query = 'UPDATE usuarios SET name = $1, email = $2, phone = $3, address = $4 WHERE id = $5';

  try {
    const connection = await database.connect();
    await connection.query(query, values);
    await connection.release();
    return true; // Retorna true si la actualización fue exitosa
  } catch (e) {
    console.error("Error al actualizar el administrador:", e);
    return false; // Retorna false si hubo un error
  }
};