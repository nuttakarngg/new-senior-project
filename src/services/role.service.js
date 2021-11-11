import axios from "axios";
import { token } from "../authentication";
import environment from "../environment";
import { authication } from "./auth.service";
const url = `${environment.apiURL}/role`;

export const getAllRoles = async () => {
  return authication().then(async () => {
    return await axios.get(`${url}/`, { headers: { token: token } });
  });
};
