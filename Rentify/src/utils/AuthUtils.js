import { jwtDecode } from "jwt-decode";

export const getToken = () => localStorage.getItem("token");

export const getSenderId = (token) => {
  if (token) {
    const decodedToken = jwtDecode(token);
    return decodedToken.nameid;
  }
  return null;
};
