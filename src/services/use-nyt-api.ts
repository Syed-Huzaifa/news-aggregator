import { get } from '../helpers/http-handler';

const nytApiUrl = process.env.REACT_APP_NYT_API_URL;

export async function fetchNytApi(params): Promise<any> {
    const url = nytApiUrl;
    try {
        const response = await get(url, { params: params });
        return (response as any).data.response.docs;
    } catch (error) {
        console.error('Error fetching news:', error);
        throw error;
    }
}