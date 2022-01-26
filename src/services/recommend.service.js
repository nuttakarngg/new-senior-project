import { authication } from "./auth.service";
import axios from "axios";
const url = `http://localhost:8080/api/rest/process/Classify`;

export const classify = async (id) => {
  return authication().then(async () => {
    return await axios.get(`${url}`, {
      params: {
        researchScholarId: id,
      },
      headers: {
        Authorization: "Basic YWRtaW46Y2hhbmdlaXQ=",
      },
    });
  });
};

export const ranking = async(label) =>{
  console.log(label);
  return authication().then(async () => {
    return await axios.get(`http://localhost:3001/api/mining/ranking`, {
      params: {
        // type: 'การวิจัยประยุกต์',
        type: 'การวิจัยประยุกต์',
        // type: label,
      },
      headers: {
        // token
      },
    });
  });
}