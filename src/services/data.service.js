import { authication } from "./auth.service";
import { token } from "../authentication";
import environment from "../environment";
import axios from "axios";
const url = `${environment.apiURL}/data`;

export const getPricePerYear = async (filterState) => {
  return authication().then(async () => {
    return await axios.get(`${url}/getPricePerYear`, {
      params: filterState,
      headers: { token },
    });
  });
};
