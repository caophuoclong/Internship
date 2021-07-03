import axios from "axios";
const api = axios.create({
  baseURL: "https://api-server-intern.herokuapp.com/api/",
});
export default api;
