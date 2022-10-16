import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 1000,
});

const AUTH_TOKEN = localStorage.getItem("auth-token");

instance.defaults.headers.common["Authorization"] = AUTH_TOKEN;

export default instance;
