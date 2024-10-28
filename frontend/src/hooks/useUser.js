import { registerUser } from "../services/user.service";

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
