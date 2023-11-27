import axios from "axios";
import { BASE_URL } from '../../config/config';

const baseurl = BASE_URL



// Create an Axios instance with default configuration
export const Axios = axios.create({
  baseURL: baseurl,
  maxBodyLength: Infinity,
  withCredentials: true, // Send and accept cookies with each request
  
});

// Request interceptor
Axios.interceptors.request.use(
  (config) => {
    // You can add any custom headers or transformations here if needed
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
Axios.interceptors.response.use(
  (response) => {
    // Handle successful responses here if needed
    return response;
  },
  (error) => {
    // Handle errors, including 401 unauthorized (if needed)
    return Promise.reject(error);
  }
);


export default Axios;



