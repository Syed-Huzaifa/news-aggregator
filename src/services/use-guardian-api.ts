import { get } from '../helpers/http-handler';

export async function fetchGuardianApi(url, params): Promise<any> {
    console.log('params- ------------>', params)
    try {
        const response = await get(url, { params: params });
        return (response as any).data.response.results;
    } catch (error) {
        console.error('Error fetching news:', error);
        throw error;
    }
}