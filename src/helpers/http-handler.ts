import axios, { AxiosRequestConfig } from 'axios';

export const get = async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    return await axios.get(url, config);
};