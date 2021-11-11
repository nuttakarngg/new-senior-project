import axios from "axios";
import environment from "../environment";
const url = `${environment.apiURL}/branch`;

export const getAllBranch = async () => {
  const token = localStorage.getItem("token");
  return await axios.get(`${url}/`, { headers: { token: token } });
};
