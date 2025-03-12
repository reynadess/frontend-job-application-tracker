import { jwtDecode } from "jwt-decode";

export const setToken = (token: string) => {
  localStorage.setItem("access_token", token);
};

export const getToken = () => {
  return localStorage.getItem("access_token");
};

export const removeToken = () => {
  localStorage.removeItem("access_token");
};

export const isTokenExpired = (token: string): boolean => {
  const decodedToken: any = jwtDecode(token);
  return decodedToken.exp * 1000 < Date.now();
};
