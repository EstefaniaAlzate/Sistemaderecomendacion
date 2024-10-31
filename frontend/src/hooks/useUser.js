import { loginUser, registerUser } from "../services/user.service";

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

export const useLoginUser = async (credentials) => {
  let data = null;

  const fetchData = async () => {
    const user = await loginUser(credentials);
    console.log(user);
    data = user;
  };
  await fetchData();
  if (!data) data = "error";
  return data;
};