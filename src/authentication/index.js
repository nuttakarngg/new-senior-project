export function setToken(token) {
  localStorage.setItem("token", token);
}


export const token = localStorage.getItem("token");
