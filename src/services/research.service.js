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
