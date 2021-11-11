import axios from "axios";
import { token } from "../authentication";
import environment from "../environment";
const url = `${environment.apiURL}/auth`;
export const loginService = async ({ email, password }) => {
  return await axios.get(`${url}/login`, { params: { email, password } });
};

export const getUserData = async () => {
  return await axios.get(`${url}/`, { headers: { token: token } });
};

export const authication = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${url}/`, { headers: { token: token } })
      .then((result) => {
        console.log(result.data)
        if (result.data.status === 200) {
          return resolve(result.data.result);
        }
      })
      .catch((e) => {
        return reject(e);
      });
  });
};
