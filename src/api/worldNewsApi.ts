import { NewsArticle } from "@/types/news";
import { categoryMapping } from "@/lib/storage";

const WORLD_NEWS_API_KEY = import.meta.env.VITE_REACT_APP_WORLD_NEWS_API_KEY;

export async function fetchWorldNewsApi(
    query: string,
    categories: string[],
    page = 1,
    pageSize = 10,
    toDate: string,
    fromDate: string,
    author?: string
): Promise<NewsArticle[]> {
    try {
        const url = new URL(import.meta.env.VITE_REACT_APP_WORLD_NEWS_API_URL);

        url.searchParams.append("api-key", WORLD_NEWS_API_KEY);

        // Handle category-based query
        const apiCategories = categories
            .map(
                (cat) => categoryMapping[cat as keyof typeof categoryMapping]?.worldapi
            )
            .filter(Boolean);
        const searchQuery =
            query || (apiCategories.length ? apiCategories.join(" OR ") : "general");
        url.searchParams.append("text", searchQuery);

        if (apiCategories.length === 1) {
            url.searchParams.append("categories", apiCategories[0]);
        }

        if (toDate) {
            url.searchParams.append("earliest-publish-date", fromDate);
        }
        
        if (fromDate) {
            url.searchParams.append("latest-publish-date", toDate);
        }

        if (author) {
            url.searchParams.append("authors", author);
        }

        url.searchParams.append("page", page.toString());
        url.searchParams.append("number", pageSize.toString());

        const res = await fetch(url.toString());
        if (!res.ok) throw new Error("World News API request failed");

        const data = await res.json();
        return data.news
            .filter((article: any) => article.image)
            .map((article: any) => ({
                id: `worldapi-${article.url}`,
                title: article.title,
                description: article.summary,
                url: article.url,
                publishedAt: article.publish_date,
                source: { id: "worldnews", name: "The World News" },
                imageUrl: article.image,
                author: article.author,
                category: article.category,
            }));
    } catch (error) {
        console.error("Error fetching from NewsAPI:", error);
        return [];
    }
}