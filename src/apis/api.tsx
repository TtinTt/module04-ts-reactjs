import axios, { AxiosStatic } from "axios";

axios.defaults.baseURL = "http://localhost:8000";

const getHeaders = (): Record<string, string | null> => {
  return {
    "X-API-Key": window.localStorage.getItem("X-API-Key"),
    "X-API-Key-Admin": window.localStorage.getItem("X-API-Key-Admin"),
  };
};

export { getHeaders };

export default axios as AxiosStatic;
