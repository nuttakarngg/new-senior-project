import axios from "axios";
import { token } from "../authentication";
import environment from "../environment";
const url = `${environment.apiURL}/mail`;

export const sendEmail = async (
  mailTemplate,
  email = "nuttakarngg@gmail.com",
  fileSelect
) => {
  console.log("mailTemplate", mailTemplate);
  return await axios.post(`${url}/`, {
    mailTemplate,
    email,
    fileSelect,
  });
};
export const getFiles = async () => {
  return await axios.get(`${url}/files`);
};
