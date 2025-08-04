// src/utils/axiosInstance.js
import axios from 'axios';

const instance = axios.create();

instance.interceptors.request.use(config => {
    const token = localStorage.getItem('jwtToken'); // Token'ı localStorage'dan çek
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

export default instance;