import axios from "axios";
const url = `https://api.aiforthai.in.th/lextoplus`;
export const lexTo = (text) => {
  return axios.get(url, {
    headers: {
      "Apikey": "XhLxbnskJM6CUXymkGIUUPJ8pCUB8oEf",
      "Content-Type": "application/x-www-form-urlencoded",
    },
    params:{
       text
    }
  });
};
