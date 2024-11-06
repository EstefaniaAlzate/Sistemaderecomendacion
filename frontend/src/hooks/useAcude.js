// hooks/acudeInventory.hook.js
import { useEffect, useState } from "react";
import { getInventoryEntries, registerInventoryEntry } from "../services/acude.service.js";

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