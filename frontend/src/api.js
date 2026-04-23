import axios from "axios";

const API = axios.create({
  baseURL: "https://lost-found-item-management-system-5jls.onrender.com/api"
});

export default API;