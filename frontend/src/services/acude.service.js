
const backUrl = "http://localhost:3000";

// Servicio para registrar una nueva entrada en acude_inventory
export const registerInventoryEntry = async (data) => {
  try {
    const response = await fetch(`${backUrl}/register_acude`, {
      method: "POST",
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
    console.error("Error al registrar entrada de inventario:", e);
    return null;
  }
};


//servicio para traer todos los acudes

export const getInventoryEntries = async () => {
  try {
    const response = await fetch(`${backUrl}/get_acudes`, {
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
    console.error("Error al obtener entradas de inventario:", e);
    return [];
  }
};

//servicio para eliminar un acude
export const deleteInventoryEntry = async (entryId) => {
  try {
    const response = await fetch(`${backUrl}/delete_acude/${entryId}`, {
      method: "DELETE",
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
    console.error("Error al eliminar entrada de inventario:", e);
    return null;
  }
};

// Servicio para actualizar una entrada en acude_inventory
export const updateInventoryEntry = async (entryId, data) => {
  try {
    const response = await fetch(`${backUrl}/update_acude/${entryId}`, {
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
    console.error("Error al actualizar entrada de inventario:", e);
    return null;
  }
};

// Servicio para enviar respuestas del cuestionario
export const submitSurveyAnswers = async (answers) => {
  try {
    const response = await fetch(`${backUrl}/submit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(answers),
    });

    if (!response.ok) {
      throw new Error(`Error en la petición: ${response.status}`);
    }

    const jsonData = await response.json();
    return jsonData;
  } catch (e) {
    console.error("Error al enviar respuestas del cuestionario:", e);
    return null;
  }
};