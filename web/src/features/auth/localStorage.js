export function saveToken(userToken) {
  localStorage.setItem("procources-access-token", JSON.stringify(userToken));
}

export function getToken() {
  const tokenString = localStorage.getItem("procources-access-token");
  const userToken = JSON.parse(tokenString);
  return userToken;
}

export function removeToken() {
  localStorage.removeItem("procources-access-token");
}