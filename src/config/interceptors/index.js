import axios from "axios";
import {API_URL} from "../../config-global";

export const PrivateApiCall = axios.create({
  baseURL: API_URL,
});
console.log(
  'localStorage.getItem("access_token")',
  localStorage.getItem("access_token")
);
PrivateApiCall.interceptors.request.use(
  async (req) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
  },
  (err) => {
    throw err;
  }
);

// Add a response interceptor
PrivateApiCall.interceptors.response.use(
  (res) => res,
  async (err) => {
    if (err?.response) {
      if (err?.response?.status === 403) {
        await localStorage.clear();
      }
    }
    throw err;
  }
);

export const PublicApiCall = axios.create({
  baseURL: API_URL,
});

PublicApiCall.interceptors.request.use(
  (req) => req,
  (err) => {
    throw err;
  }
);

PublicApiCall.interceptors.response.use(
  (res) => res,
  (err) => {
    throw err;
  }
);
