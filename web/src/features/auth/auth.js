import API from "../../services";
import URL from '../../services/API/config'
import { getToken } from "./localStorage";

export const register = async (email, fullName, phoneNumber, password) => {
  const result = API.post(URL.URL_REGISTER, {
    email,
    fullName,
    phoneNumber,
    password,
  });
  return result;
};

export const signin = async (email, password) => {
  const result = API.post(URL.URL_LOGIN, {
    email,
    password,
  });
  return result;
};

export const callTest = async () => {
  const token = getToken();
  const result = API.get("http://localhost:32/api/users/test", null, {
    headers: { "procources-access-token": `${token}` },
  });
  console.log(result);
};

export const verify = async (id) => {
  console.log(id);
  const result = await API.get(URL.URL_VERIFY + `?id=${id}`);
  return result;
};

export const getCurrentUser = async () => {
  const token = getToken();
  const result = await API.get(
    URL.URL_CURRENT_USERS,
    null,
    { headers: { "procources-access-token": `${token}` } }
  );
  return result;
};
