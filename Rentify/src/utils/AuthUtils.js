import { jwtDecode } from "jwt-decode";

export const getToken = () => localStorage.getItem("token");

export const getReceiverId = () => localStorage.getItem("receiverId");

export const getSenderId = (token) => {
  const decodedToken = jwtDecode(token);
  return decodedToken.nameid;
};
