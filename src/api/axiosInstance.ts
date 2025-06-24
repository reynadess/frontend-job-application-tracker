import axios from 'axios';
import API_ROUTES from '@/config/config';
import { getToken, removeToken } from '@/shared/utils/tokenUtils';
import { useNavigate } from 'react-router-dom';

// Create Axios Instance with Base URL
const api = axios.create({
    baseURL: API_ROUTES.BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
});

// Add Token to Requests
api.interceptors.request.use((config) => {
    const token = getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Handle Token Expiry
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            const naviagate = useNavigate();
            removeToken();
            naviagate('/home'); // Auto-redirect on token expiry
        }
        return Promise.reject(error);
    }
);

export default api;
