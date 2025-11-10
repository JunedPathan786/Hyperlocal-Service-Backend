import axios from 'axios'

// Use Vite env variable when available. import.meta.env is provided by Vite.
const baseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000/api";

const API = axios.create({
  baseURL,
  withCredentials: true,
});

// Request interceptor - add auth token
API.interceptors.request.use((config) => {
  try {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
      console.log('Adding token to request:', config.url);
    } else {
      console.log('No token found for request:', config.url);
    }
  } catch (err) {
    console.error('Error in request interceptor:', err);
  }
  return config;
});

// Response interceptor - handle errors
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.log('Unauthorized request, clearing token');
      localStorage.removeItem('token');
    }
    return Promise.reject(error);
  }
);

export default API;
