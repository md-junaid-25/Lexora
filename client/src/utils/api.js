// src/utils/api.js
import axios from 'axios';

// Create an axios instance
const api = axios.create({
  baseURL: 'https://lexora-otlc.onrender.com/api', // Node server URL
});

// Automatically add the Token to every request if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth-token');
  if (token) {
    config.headers['auth-token'] = token;
  }
  return config;
});

export default api;
