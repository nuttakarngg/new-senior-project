import axios from "axios";
import { token } from "../authentication";
import environment from "../environment";
const url = `${environment.apiURL}/researcher`;

export const getAllResearcher = async (filterState) => {
  return await axios.get(`${url}/`, {
    params: filterState,
    headers: { token: token },
  });
};
