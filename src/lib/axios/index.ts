import { getToken } from "./../localStorage/index";
import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

const AUTH_TOKEN = getToken();

instance.defaults.headers.common["Authorization"] = `Bearer ${AUTH_TOKEN}`;

export default instance;
