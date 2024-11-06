import { deleteAdmin, getAdmins, loginUser, registerUser, updateAdmin } from "../services/user.service";

export const useRegisterUser = async (datas) => {
  let data = null;

  const fetchData = async () => {
    const user = await registerUser(datas);
    console.log(user);
    data = user;
  };
  await fetchData();
  if (!data) data = "error";
  return data;
};

export const useLogUser = async (datas) => {
  let data = null;

  const fetchData = async () => {
    const user = await loginUser(datas);
    console.log(user);
    data = user;
  };
  await fetchData();
  if (!data) data = "error";
  return data;
};

export const useGetAdmins = async () => {
  let data = null;

  const fetchData = async () => {
    const admins = await getAdmins();
    data = admins;
  };

  await fetchData();
  if (!data) data = "error";
  return data;
};
//hook para eliminar
export const useDeleteAdmin = async (id) => {
  let response = null;

  const fetchDelete = async () => {
    response = await deleteAdmin(id);
  };

  await fetchDelete();
  return response;
};

//hook de actualizar
export const useUpdateAdmin = async (data) => {
  let result = null;

  const fetchData = async () => {
    result = await updateAdmin(data);
  };

  await fetchData();
  if (!result) result = "error";
  return result;
};