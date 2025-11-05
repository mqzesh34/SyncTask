import axios from 'axios'

const BASE_API_URL = "http://localhost:5001/api";

const axiosClient = axios.create({
    baseURL: BASE_API_URL,
    timeout: 10000,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    }
})

export default axiosClient