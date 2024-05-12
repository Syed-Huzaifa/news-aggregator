import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

async function apiHandler<T>(config: AxiosRequestConfig): Promise<T> {
    try {
        const response: AxiosResponse<T> = await axios(config);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const get = async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    return await axios.get(url, config);
};

export default apiHandler;