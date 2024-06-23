import axios from 'axios';

const API_URL = 'http://localhost:8080/api/accounts';

const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

export const getAccounts = () => axiosInstance.get('/');
export const createAccount = (account) => axiosInstance.post('/', account);
export const updateAccount = (id, account) => axiosInstance.put(`/${id}`, account);
export const deleteAccount = (id) => axiosInstance.delete(`/${id}`);
export const deposit = (id, amount) => axiosInstance.put(`/${id}/deposit`, { amount });
export const withdraw = (id, amount) => axiosInstance.put(`/${id}/withdraw`, { amount });
