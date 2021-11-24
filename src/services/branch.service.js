import axios from "axios";
import { token } from "../authentication";
import environment from "../environment";
const url = `${environment.apiURL}/branch`;

export const getAllBranch = async () => {
  return await axios.get(`${url}/`, { headers: { token: token } });
};
