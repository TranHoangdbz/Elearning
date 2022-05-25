import LOCAL_STORAGE from "../../constants/"
console.log(LOCAL_STORAGE)
export function saveToken(userToken) {
  localStorage.setItem(LOCAL_STORAGE.AUTH_TOKEN_KEY, JSON.stringify(userToken));
}

export function getToken() {
  const tokenString = localStorage.getItem(LOCAL_STORAGE.AUTH_TOKEN_KEY);
  const userToken = JSON.parse(tokenString);
  return userToken;
}

export function removeToken() {
  localStorage.removeItem(LOCAL_STORAGE.AUTH_TOKEN_KEY);
}