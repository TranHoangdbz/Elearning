import API from "../../services";
import { getToken } from "./localStorage";

export const register = async (email, fullName, phoneNumber, password) => {
    const result = API.post('http://localhost:32/api/users/register', {email, fullName, phoneNumber, password});
    return result;
}

export const signin = async (email, password) => {
    const result = API.post('http://localhost:32/api/users/login', {email, password});
    return result;
}

export const callTest = async () => {
    const token = getToken();
    const result = API.get('http://localhost:32/api/users/test', null, { headers: {"procources-access-token" : `${token}`} });
    console.log(result);
}