import axios from "axios";
import { token } from "../authentication";
import environment from "../environment";
import { authication } from "./auth.service";
const url = `${environment.apiURL}/user`;

export const getAllUser = (keyword = "") => {
  return authication().then(async () => {
    return await axios.get(`${url}?keyword=${keyword}`, {
      headers: { token: token },
    });
  });
};

export const removeUserById = async (id) => {
  return authication().then(async () => {
    return await axios.delete(`${url}/${id}`, { headers: { token: token } });
  });
};

export const addUser = async (user) => {
  return authication().then(async () => {
    return await axios.post(`${url}/`, user, { headers: { token: token } });
  });
};

export const getUserById = async (id) => {
    return await axios.get(`${url}/` + id, { headers: { token: token } });
};

export const editUser = async (id, user) => {
  return authication().then(async () => {
    return await axios.put(`${url}/${id}`, user, { headers: { token: token } });
  });
};

export const editProfile = async (user) => {
  return authication().then(async () => {
    return await axios.put(
      `${url}/editProfile`,
      { ...user },
      { headers: { token: token } }
    );
  });
};
