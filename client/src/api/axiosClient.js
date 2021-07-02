import axios from "axios";
import queryString from "query-string";
const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    console.log(error);
    throw error;
  }
);
export default axiosClient;
