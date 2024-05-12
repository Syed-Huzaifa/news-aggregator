import { get } from '../helpers/http-handler';

const GUARDIAN_API_URL = process.env.REACT_APP_THE_GUARDIAN_API_URL;
const MAX_RETRIES = 3;
const INITIAL_DELAY = 1000; // Initial delay in milliseconds

async function fetchGuardianApi(params): Promise<any> {
    console.log('params', params);
    const url = GUARDIAN_API_URL;
    try {
        return await fetchDataWithRetry(url, params);
    } catch (error) {
        console.error('Error fetching news:', error);
        throw error;
    }
}

async function fetchDataWithRetry(url: string, params: any, retries = 0, delay = INITIAL_DELAY): Promise<any> {
    try {
        const response = await get(url, { params });
        return (response as any).data.response.results;
    } catch (error) {
        if (error.response && error.response.status === 429 && retries < MAX_RETRIES) {
            const nextDelay = delay * 2;
            await new Promise(resolve => setTimeout(resolve, nextDelay));
            return fetchDataWithRetry(url, params, retries + 1, nextDelay);
        } else {
            throw error;
        }
    }
}

export { fetchGuardianApi };
