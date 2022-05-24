import API from "../../services";

export const register = async (email, fullName, phoneNumber, password) => {
    const result = API.post('http://localhost:32/api/users/register', {email, fullName, phoneNumber, password});
    return result;
}

export const signin = async (email, password) => {
    const result = API.post('http://localhost:32/api/users/login', {email, password});
    return result;
}