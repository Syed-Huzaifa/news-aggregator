import { NewsArticle } from "@/types/news";
import { fetchWorldNewsApi } from "./worldNewsApi";
import { fetchNYT } from "./nytApi";
import { fetchGuardian } from "./guardianApi";

export const categoryMapping = {
    business: {
        worldapi: "business",
        nyt: "Business",
        guardian: "business",
    },
    technology: {
        worldapi: "technology",
        nyt: "Technology",
        guardian: "technology",
    },
    sports: {
        worldapi: "sports",
        nyt: "Sports",
        guardian: "sport",
    },
    entertainment: {
        worldapi: "entertainment",
        nyt: "Arts",
        guardian: "culture",
    },
    health: {
        worldapi: "health",
        nyt: "Health",
        guardian: "healthcare",
    },
    science: {
        worldapi: "science",
        nyt: "Science",
        guardian: "science",
    },
    politics: {
        worldapi: "politics",
        nyt: "Politics",
        guardian: "politics",
    },
    world: {
        worldapi: "world",
        nyt: "World",
        guardian: "world",
    },
};

export async function fetchNews(
    query: string,
    categories: string[],
    page = 1,
    pageSize = 10,
    providers: string[],
    toDate: string,
    fromDate: string,
    author?: string
): Promise<NewsArticle[]> {
    const promises = providers.map((provider) => {
        switch (provider) {
            case "worldnews":
                return fetchWorldNewsApi(query, categories, page, pageSize, toDate, fromDate, author);
            case "nyt":
                return fetchNYT(query, categories, page, pageSize, fromDate, toDate);
            case "guardian":
                return fetchGuardian(query, categories, page, pageSize, toDate, fromDate);
            default:
                return Promise.resolve([]);
        }
    });
    
    try {
        const results = await Promise.allSettled(promises);
        return results
            .filter(
                (result): result is PromiseFulfilledResult<NewsArticle[]> =>
                    result.status === "fulfilled"
            )
            .flatMap((result) => result.value);
    } catch (error) {
        console.error("Error fetching news:", error);
        return [];
    }
}
