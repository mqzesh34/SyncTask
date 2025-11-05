import axiosClient from "../api/axiosClient";
import { type UserCredentials } from "../types.d";

export const login = async (credentials: UserCredentials) => {
    try {
        const response = await axiosClient.post('/auth/login', credentials);
        return response.data; 
    } catch (error) {
        throw error;
    }
};

export const register = async (Credentials: UserCredentials) => {
    try {
        const response = await axiosClient.post("auth/register", Credentials);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const logout = async () => {
    try {
        const response = await axiosClient.post("auth/logout");
        return response.data;
    } catch (error) {
        throw error;
    }
}