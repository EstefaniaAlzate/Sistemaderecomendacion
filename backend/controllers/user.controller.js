import { createUser, deleteAdminFromDatabase, getAllAdmins, loginUser, updateAdminInDatabase } from "../models/user.js";
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
  const registeredUser = await createUser({
    id,
    name,
    encriptedPassword,
    role,
    email,
    phone,
    address,
  });
  if (!registeredUser)
    return res.status(400).json({ message: "error al registrar usuario" });
  return res.status(200).json({ message: "OK" });
};

export const logUser = async (req, res) => {
  const { id, password } = req.body;
  const loggedUser = await loginUser({ id });

  if (!loggedUser) {
    return res.status(400).json({ message: "Error al loggear usuario" });
  }

  const validPassword = await compare(password, loggedUser.password);
  if (!validPassword) {
    console.log("Contraseña inválida para el usuario:", id);
    return res.status(400).json({ message: "Error al logear usuario: contraseña inválida" });
  }

  // Desencripta los datos antes de enviarlos
  const decryptedName = await decryptCrypto(loggedUser.name);

  const decryptedEmail = await decryptCrypto(loggedUser.email);

  const decryptedPhone = await decryptCrypto(loggedUser.phone);

  const decryptedAddress = await decryptCrypto(loggedUser.address);

  // Enviar todos los datos desencriptados del usuario
  return res.status(200).json({
    response: {
      id: loggedUser.id,
      name: decryptedName,
      email: decryptedEmail,
      role: loggedUser.role,
      phone: decryptedPhone,
      address: decryptedAddress
    },
  });
};

//Controlador para poder traer todos los administradores

export const getAdmins = async (req, res) => {
  try {
    // Obtener los administradores de la base de datos
    const admins = await getAllAdmins();

    if (!admins) {
      return res.status(400).json({ message: "Error al obtener administradores" });
    }

    // Desencriptar los datos de cada administrador antes de enviarlos
    const decryptedAdmins = await Promise.all(
      admins.map(async (admin) => {
        const decryptedName = await decryptCrypto(admin.name);
        const decryptedEmail = await decryptCrypto(admin.email);
        const decryptedPhone = await decryptCrypto(admin.phone);
        const decryptedAddress = await decryptCrypto(admin.address);

        return {
          id: admin.id,
          name: decryptedName,
          role: admin.role,
          email: decryptedEmail,
          phone: decryptedPhone,
          address: decryptedAddress
        };
      })
    );

    // Enviar la lista de administradores con datos desencriptados
    return res.status(200).json(decryptedAdmins);

  } catch (e) {
    console.error("Error al obtener administradores:", e);
    return res.status(500).json({ error: "Error al obtener administradores" });
  }
};


//controlador para eliminar un administrador

export const deleteAdmin = async (req, res) => {
  const { id } = req.params; // Obtén el ID del administrador de los parámetros de la solicitud
  try {
    const success = await deleteAdminFromDatabase(id);
    if (success) {
      return res.status(204).send(); // Devuelve 204 si la eliminación fue exitosa
    }
    return res.status(404).send("Administrador no encontrado."); // Devuelve 404 si no se encontró
  } catch (error) {
    console.error("Error en el controlador al eliminar administrador:", error);
    return res.status(500).send("Error al eliminar el administrador."); // Devuelve 500 si hubo un error
  }
};

//controlador para actualizar un administrador 
export const updateAdmin = async (req, res) => {
  const { id } = req.params; // Obtén el ID del administrador de los parámetros de la solicitud
  let { name, email, phone, address } = req.body;

  // Encriptar los datos nuevos antes de almacenarlos
  name = await encryptCrypto(name);
  email = await encryptCrypto(email);
  phone = await encryptCrypto(phone);
  address = await encryptCrypto(address);

  try {
    const success = await updateAdminInDatabase({
      id,
      name,
      email,
      phone,
      address,
    });

    if (success) {
      return res.status(200).json({ message: "Administrador actualizado con éxito." });
    }
    return res.status(404).send("Administrador no encontrado."); // Devuelve 404 si no se encontró
  } catch (error) {
    console.error("Error en el controlador al actualizar administrador:", error);
    return res.status(500).send("Error al actualizar el administrador."); // Devuelve 500 si hubo un error
  }
};