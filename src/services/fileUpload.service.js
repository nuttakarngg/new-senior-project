import axios from "axios";
import { token } from "../authentication";
import environment from "../environment";
const url = `${environment.apiURL}/upload`;

export const editProfileImage = async (image) => {
  var formData = new FormData();
  formData.append("image", image);
  return await axios.post(`${url}/userProfile`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      token: token,
    },
  });
};
