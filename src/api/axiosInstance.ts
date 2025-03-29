// src/api/axiosInstance.ts

import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/', // Replace with your backend URL
  // baseURL: 'https://blog-backend-theta-five.vercel.app/', // Replace with your backend URL
});

export default axiosInstance;
