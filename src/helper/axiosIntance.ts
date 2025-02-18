import axios from "axios";

const axiosPrivate = axios.create();
axiosPrivate.defaults.headers.post["Content-Type"] = "application/json";
axiosPrivate.defaults.headers["Accept"] = "application/json";
axiosPrivate.defaults.timeout = 60000;

// Add a request interceptor
axiosPrivate.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("token");
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosPrivate.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default axiosPrivate;
