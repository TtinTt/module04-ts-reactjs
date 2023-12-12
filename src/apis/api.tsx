import axios, { AxiosStatic } from "axios";

axios.defaults.baseURL = "http://localhost:8000";

const getHeaders = (): Record<string, string | null> => {
  return {
    userToken: window.localStorage.getItem("userToken"),
    adminToken: window.localStorage.getItem("adminToken"),
  };
};

export { getHeaders };

export default axios as AxiosStatic;
