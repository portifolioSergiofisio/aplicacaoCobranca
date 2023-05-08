import axios from 'axios';
import { limparLocalStorage } from '../utilidades/localStorage';

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

export default axios.create({
  baseURL: API_ENDPOINT,
  timeout: 20000,
  headers: {
    'Content-Type': 'application/json',
  },
});

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error?.response?.status === 401) {
      setTimeout(() => {
        window.location.replace(API_ENDPOINT);
        limparLocalStorage();
      }, 10000);
    }
    return Promise.reject(error);
  }
);
