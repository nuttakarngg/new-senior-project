import { authication } from "./auth.service";
import axios from "axios";
const url = `http://20.185.148.204:8080/api/rest/process/classify`;

export const classify = async (id) => {
    return await axios.get(`${url}`, {
      params: {
        researchScholarId: id,
      },
      headers: {
        Authorization: "Basic YWRtaW46Y2hhbmdlaXQ=",
      },
    });
};

export const ranking = async (label) => {
  console.log(label);
    return await axios.get(`http://localhost:3001/api/mining/ranking`, {
      params: {
        // type: 'การวิจัยพื้นฐาน',
        type: label,
      },
      headers: {
        // token
      },
    });
};
