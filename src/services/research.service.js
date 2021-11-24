import { authication } from "./auth.service";
import { token } from "../authentication";
import environment from "../environment";
import axios from "axios";
const url = `${environment.apiURL}/research`;
export const addResearch = async (research) => {
  return authication().then(async () => {
    return await axios.post(`${url}/`, { ...research }, { headers: { token } });
  });
};

export const getResearchById = async (id) => {
  return authication().then(async () => {
    return await axios.get(`${url}/getResearchById/${id}`, {
      headers: { token },
    });
  });
};

export const getResearchAll = async () => {
  return authication().then(async () => {
    return await axios.get(`${url}/`, {
      headers: { token },
    });
  });
};