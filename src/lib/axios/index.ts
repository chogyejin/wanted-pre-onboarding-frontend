import { getToken } from "./../localStorage/index";
import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

instance.interceptors.request.use(
  (config) => {
    if (config.headers) {
      const token = getToken();
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    console.error(error);
    return Promise.reject(error);
  }
);

export default instance;
