import axios from 'axios';
import Cookies from 'js-cookie';


const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api',
  withCredentials: true,
});

instance.interceptors.request.use((config) => {
  const token_cookies = Cookies.get('auth_token');
  const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
  if (token_cookies || token) {
    config.headers.Authorization = `Bearer ${token_cookies ?? token}`;
  }
  config.withCredentials = true;
  return config;
});

export default instance;
