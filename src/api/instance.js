import axios from "axios";
import { BASE_URL } from "../constant";

const apiInstance = axios.create({ baseURL: BASE_URL, withCredentials: true });

apiInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log(error);

    if (error.response.status === 401) {
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default apiInstance;
