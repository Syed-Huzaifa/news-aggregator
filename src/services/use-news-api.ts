import { get } from '../helpers/http-handler';

export async function fetchNewsApi(url, params): Promise<any> {
    try {
        const response = await get(url, { params: params });
        return (response as any).data.articles;
    } catch (error) {
        console.error('Error fetching news:', error);
        throw error;
    }
}