import CONSTANTS from "../../constants/"

export function saveToken(userToken) {
  localStorage.setItem(CONSTANTS.LOCAL_STORAGE.AUTH_TOKEN_KEY, JSON.stringify(userToken));
}

export function getToken() {
  const tokenString = localStorage.getItem(CONSTANTS.LOCAL_STORAGE.AUTH_TOKEN_KEY);
  const userToken = JSON.parse(tokenString);
  return userToken;
}

export function removeToken() {
  localStorage.removeItem(CONSTANTS.LOCAL_STORAGE.AUTH_TOKEN_KEY);
}