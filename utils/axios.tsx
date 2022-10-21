import axios, { AxiosRequestConfig } from "axios";

const BASE_URL = "https://randomuser.me/api";
// const BASE_URL = "http://localhost:3010/api/v1";

const request = axios.create({
  // baseURL: process.env.REACT_APP_BACKEND_URL,
  baseURL: BASE_URL,
  headers: {
    "Content-type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
  timeout: 10000000,
  // withCredentials: true,
});

request.interceptors.request.use(
  function (config: AxiosRequestConfig) {
    // const token = localStorage.getItem("jwtToken");
    // config.headers["Authorization"] = `Bearer ${token}`;

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default request;
