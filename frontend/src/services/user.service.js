const backUrl = "http://localhost:3000";
export const registerUser = async (data) => {
  try {
    const response = await fetch(backUrl + "/register_user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Error en la peticion: ${response.status}`);
    }
    const jsonData = await response.json();

    return jsonData;
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const loginUser = async (data) => {
  try {
    const response = await fetch(`${backUrl}/login_user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error(`Error en la petición: ${response.status}`);
    }

    const jsonData = await response.json();
    return jsonData;
  } catch (e) {
    console.error(e);
    return "error";
  }
};

//servicio donde estamos llamando a la api de la base de datos para traer los usuarios
export const getAdmins = async () => {
  try {
    const response = await fetch(`${backUrl}/get_admins`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error en la petición: ${response.status}`);
    }

    const jsonData = await response.json();
    return jsonData;
  } catch (e) {
    console.error("Error al obtener administradores:", e);
    return null;
  }
};

//poder eliminar un administrador
export const deleteAdmin = async (id) => {
  try {
    const response = await fetch(`${backUrl}/delete_admin/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error en la petición: ${response.status}`);
    }

    return true; // Retorna true si la eliminación fue exitosa
  } catch (error) {
    console.error("Error al eliminar administrador:", error);
    return null; // En caso de error, retornar null
  }
};

//servicio para actualizar

export const updateAdmin = async (data) => {
  try {
    const response = await fetch(`${backUrl}/update_admin/${data.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Error en la petición: ${response.status}`);
    }

    const jsonData = await response.json();
    return jsonData;
  } catch (e) {
    console.error("Error al actualizar administrador:", e);
    return null;
  }
};