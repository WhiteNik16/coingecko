import axios, { AxiosInstance } from "axios";

const api: AxiosInstance = axios.create({
  baseURL: "https://api.coingecko.com/api/v3",
  withCredentials: false,
});

export { api };
