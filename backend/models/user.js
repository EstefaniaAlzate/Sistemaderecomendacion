import { database } from "../database/database.js";

export const createUser = async (user) => {
  const values = [ user.id, user.name, user.encriptedPassword, user.role, user.email, user.phone ];
  const query ='INSERT INTO usuarios (id, name, "password", "role", email, phone, address) values ($1,$2, $3, $4, $5, $6, $7)';
  console.log(user.encriptedPassword);
  try {
    const connection = await database.connect();
    const { rows } = await connection.query(query, values);
    await connection.release();
    console.log(rows);
    return rows;
  } catch (e) {
    console.log(e);
    return null;
  }
};
