import { authication } from "./auth.service";
import { token } from "../authentication";
import environment from "../environment";
import axios from "axios";
const url = `${environment.apiURL}/scholar`;

export const createScholar = async (scholar) => {
  return authication().then(async () => {
    return await axios.post(`${url}/`, scholar, {
      headers: { token },
    });
  });
};

export const getAllScholar = async () => {
  return authication().then(async () => {
    return await axios.get(`${url}/`, {
      headers: { token },
    });
  });
};

export const getOwner = async () => {
  return authication().then(async () => {
    return await axios.get(`${url}/getOwner`, {
      headers: { token },
    });
  });
};

export const removeScholar = async (id) => {
  return await axios.delete(`${url}/${id}`, {
    headers: { token },
  });
};
