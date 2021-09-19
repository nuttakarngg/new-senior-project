import axios from "axios";
import environment from "../environment";
const url = `${environment.apiURL}/auth`;
export const loginService = async ({ email, password }) => {
        return await axios.get(`${url}/login`,{ params:{ email, password }});
 
};
