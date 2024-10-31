import { createUser, logUser } from "../models/user.js";
import { encrypt, compare } from "../helpers/handleBcrypt.js";
import { encryptCrypto, decryptCrypto } from "../helpers/handleCrypto.js";

export const registerUser = async (req, res) => {
  let { id, name, password, role, email, phone, address } = req.body;
  //son promesas y por eso el await
  name = await encryptCrypto(name);
  email = await encryptCrypto(email);
  phone = await encryptCrypto(phone);
  address = await encryptCrypto(address);
  const encriptedPassword = await encrypt(password);
  const registeredUser = await createUser({ id, name, encriptedPassword, role, email, phone, address });
  if (!registeredUser)
    return res.status(400).json({ message: "error al registrar usuario" });
  return res.status(200).json({ message: "OK" });
};

export const loginUser = async (req, res) => {
  let { id, password } = req.body;

  if (!id || !password) {
    return res.status(400).json({ message: "ID y contraseña son requeridos" });
  }

  const user = await logUser(id);
  if (!user) {
    return res.status(401).json({ message: "Usuario no encontrado" });
  }

  const isPasswordValid = await compare(password, user.password); // Asegúrate de usar el campo correcto para la contraseña
  if (!isPasswordValid) {
    return res.status(401).json({ message: "Contraseña incorrecta" });
  }

  return res.status(200).json({ message: "Inicio de sesión exitoso", user });
};
