import { get } from 'src/helpers/http-handler';
import { NewsApiArticle } from 'src/interfaces/feeds.interface';
import { fetchNewsApi } from 'src/services/use-news-api';
import { fetchNytApi } from 'src/services/use-nyt-api';
import { fetchGuardianApi } from 'src/services/use-guardian-api';

const newsApiUrl = process.env.REACT_APP_NEWS_API_URL;
const newsApiKey = process.env.REACT_APP_NEWS_API_KEY;
const newsApiTopHeadlinesUrl = process.env.REACT_APP_NEWS_API_TOP_HEADLINES_URL;

const nytApiUrl = process.env.REACT_APP_NYT_API_URL;
const nytApiKey = process.env.REACT_APP_NYT_API_KEY;

const guardianApiUrl = process.env.REACT_APP_THE_GUARDIAN_API_URL;
const guardianApiKey = process.env.REACT_APP_THE_GUARDIAN_API_KEY;

export const normalizeAndMergeArticles = (articles: any[]) => {
    return articles.map((article: any) => {
        let feedArticle: NewsApiArticle;
        if (article.source?.name) {
            feedArticle = {
                title: article.title,
                description: article.description || '',
                coverImgUrl: article.urlToImage || '',
                source: article.source.name || '',
                author: article.author || '',
                publishedAt: article.publishedAt || '',
            };
        } else if (article.headline?.main) {
            feedArticle = {
                title: article.headline.main,
                description: article.abstract || '',
                coverImgUrl: article.multimedia && article.multimedia.length > 0 ? `https://www.nytimes.com/${article.multimedia[0].url}` : '',
                source: 'The New York Times',
                author: article.byline ? article.byline.original : '',
                publishedAt: article.pub_date || '',
            };
        } else if (article.webTitle) {
            feedArticle = {
                title: article.webTitle,
                description: '',
                coverImgUrl: '',
                source: article.sectionName || '',
                author: '',
                publishedAt: article.webPublicationDate || '',
            };
        }
        return feedArticle;
    });
};

const createNewsApiParams = (q: string[], sources: string, author: string) => {
    return {
        q: q.join(', '),
        sources: sources ? sources : '',
        apiKey: newsApiKey,
        author: author ? author : ''
    };
}

const createNytApiParams = (q: string[], fq: string, author: string) => {
    let params = {}
    params = { ...params, q: q.join(','), 'api-key': nytApiKey };

    if (fq) {
        params = { ...params, fq: `news_desk:("${fq ? fq : ''}")` }
    }

    if (author) {
        params = { ...params, fq: `byline:("${author ? author : ''}")` }
    }
    return {
        q: q.join(', '),
        fq: `news_desk:("${fq ? fq : ''}")&fq=byline:("${author ? author : ''}")`,
        'api-key': nytApiKey,
    };
}

const createGuardianApiParams = (q: string[], section: string, author: string) => {
    let params = {}
    params = { ...params, q: q.join(', '), 'api-key': guardianApiKey }
    if (section) {
        params = { ...params, section: section }
    }

    if (author) {
        params = { ...params, author: author }
    }
    return params;
}


export const fetchArticlesWithQuery = async (categories: string[], source?: string, author?: string) => {
    try {
        const [newsApiResponse, nytApiResponse, guardianApiResponse] = await Promise.all([
            fetchNewsApi(newsApiUrl, createNewsApiParams(categories, source, author)),
            fetchNytApi(createNytApiParams(categories, source, author)),
            fetchGuardianApi(guardianApiUrl, createGuardianApiParams(categories, source, author)),
        ]);

        const newsArticles = normalizeAndMergeArticles(newsApiResponse);
        const nytArticles = normalizeAndMergeArticles((nytApiResponse as any));
        const guardianArticles = normalizeAndMergeArticles((guardianApiResponse as any));

        const allArticles = [...newsArticles, ...nytArticles, ...guardianArticles];
        return allArticles;
    } catch (error) {
        console.error('Error fetching articles with query:', error);
    }
};

export const fetchTopHeadlines = async () => {
    try {
        const headlinesApiResponse = await get(`${newsApiTopHeadlinesUrl}?country=us&apiKey=${newsApiKey}`);
        return (headlinesApiResponse as any).data.articles;
    } catch (error) {
        console.error('Error fetching headlines with query:', error);
    }
}


export const formatDate = (date: string) => {
    return new Date(date).toDateString();
}