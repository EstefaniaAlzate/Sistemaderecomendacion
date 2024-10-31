import { database } from "../database/database.js";

export const createUser = async (user) => {
  const values = [user.id, user.name, user.encriptedPassword, user.role, user.email, user.phone, user.address];
  const query = 'INSERT INTO usuarios (id, name, "password", "role", email, phone, address) values ($1,$2, $3, $4, $5, $6, $7)';
  // console.log(user.encriptedPassword);
  try {
    const connection = await database.connect();
    const { rows } = await connection.query(query, values);
    await connection.release();
    console.log(rows);
    return rows;
  } catch (e) {
    console.log("Error al registrar usuario" + e);
    return null;
  }
};

// export const updateUser = async (user) => {
//   const values = [user.id, user.name, user.encriptedPassword, user.role, user.email, user.phone, user.address];
//   const query = 'INSERT INTO usuarios (id, name, "password", "role", email, phone, address) values ($1,$2, $3, $4, $5, $6, $7)';
//   // console.log(user.encriptedPassword);
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

export const logUser = async (user) => {
  const values = [user.id];
  const query = 'SELECT password, role FROM usuarios WHERE id = $1';

  try {
    const connection = await database.connect();
    const { rows } = await connection.query(query, values);
    await connection.release();
    return rows[0]; // Retorna el primer usuario encontrado o undefined
  } catch (e) {
    console.log("Error al obtener usuario: " + e);
    return null;
  }
};