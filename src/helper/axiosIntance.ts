import axios from "axios";

const axiosPrivate = axios.create();
axiosPrivate.defaults.headers.post["Content-Type"] = "application/json";
axiosPrivate.defaults.headers["Accept"] = "application/json";
axiosPrivate.defaults.timeout = 60000;

const token = localStorage.getItem("token");

// Add a request interceptor
axiosPrivate.interceptors.request.use(
  function (config) {
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

export default axiosPrivate;
