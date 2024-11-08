// hooks/acudeInventory.hook.js
import { useEffect, useState } from "react";
import { deleteInventoryEntry, getInventoryEntries, registerInventoryEntry, submitSurveyAnswers, updateInventoryEntry } from "../services/acude.service.js";

export const useRegisterInventory = async (data) => {
  let result = null;

  const fetchData = async () => {
    result = await registerInventoryEntry(data);
  };

  await fetchData();
  if (!result) result = "error";
  return result;
};

//hook para poder implementar el getAcudes
export const useGetInventoryEntries = () => {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEntries = async () => {
      const data = await getInventoryEntries();
      setEntries(data);
      setLoading(false);
    };

    fetchEntries();
  }, []);

  return { entries, loading };
};


export const useGetInventoryEntriesForRecomendations = () => {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const data = await getInventoryEntries();  // Asumimos que `getInventoryEntries` es la función que hace la solicitud.
        if (Array.isArray(data)) {
          setEntries(data);
        } else {
          console.error("La respuesta de la API no es un array:", data);
        }
      } catch (error) {
        console.error("Error al obtener los datos de la API:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEntries();
  }, []);

  return { entries, loading };
};


//hook para eliminar un acude
export const useDeleteInventoryEntry = () => {
  const [status, setStatus] = useState(null);

  const handleDelete = async (entryId) => {
    const result = await deleteInventoryEntry(entryId);
    if (result) {
      setStatus("deleted");
    } else {
      setStatus("error");
    }
  };

  return { status, handleDelete };
};

//hook para poder actualizar datos en base de datos
export const useUpdateInventoryEntry = () => {
  const [status, setStatus] = useState(null);

  const handleUpdateEntry = async (entryData) => {
    try {
      const result = await updateInventoryEntry(entryData.id, entryData);
      if (result) {
        setStatus("updated");
        return result;
      } else {
        setStatus("error");
        return null;
      }
    } catch (error) {
      console.error("Error al actualizar la entrada:", error);
      setStatus("error");
      return null;
    }
  };

  return { status, handleUpdateEntry };
};

export const useSubmitSurvey = () => {
  const [status, setStatus] = useState(null);

  const handleSubmitSurvey = async (answers) => {
    setStatus("loading");

    const result = await submitSurveyAnswers(answers);

    if (result) {
      setStatus("success");
      return result; // Handle the result as needed
    } else {
      setStatus("error");
      return null;
    }
  };

  return { status, handleSubmitSurvey };
};