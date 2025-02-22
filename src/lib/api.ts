import { NewsArticle, NewsProvider } from "@/types/news";

const WORLD_NEWS_API_KEY = import.meta.env.VITE_REACT_APP_WORLD_NEWS_API_KEY;
const NYT_API_KEY = import.meta.env.VITE_REACT_APP_NYT_API_KEY;
const GUARDIAN_API_KEY = import.meta.env.VITE_REACT_APP_THE_GUARDIAN_API_KEY;

const categoryMapping = {
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

async function fetchWorldNewsApi(
    query: string,
    categories: string[],
    page = 1,
    pageSize = 10
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
                source: article.source ?? {},
                imageUrl: article.image,
                author: article.author,
                category: article.category,
            }));
    } catch (error) {
        console.error("Error fetching from NewsAPI:", error);
        return [];
    }
}

async function fetchNYT(
    query: string,
    categories: string[],
    page = 1,
    pageSize = 10
): Promise<NewsArticle[]> {
    try {
        const url = new URL(import.meta.env.VITE_REACT_APP_NYT_API_URL);
        url.searchParams.append("api-key", NYT_API_KEY);

        // Handle category-based query
        const apiCategories = categories
            .map((cat) => categoryMapping[cat as keyof typeof categoryMapping]?.nyt)
            .filter(Boolean);
        const searchQuery =
            query || (apiCategories.length ? apiCategories.join(" OR ") : "");
        url.searchParams.append("q", searchQuery);

        url.searchParams.append("page", page.toString());
        url.searchParams.append(
            "fl",
            "headline,abstract,web_url,pub_date,byline,multimedia,news_desk"
        );

        const res = await fetch(url.toString());
        if (!res.ok) throw new Error("NYT API request failed");

        const data = await res.json();
        return data.response.docs
            .filter(
                (article: any) =>
                    article.multimedia?.length > 0 &&
                    (!apiCategories.length || apiCategories.includes(article.news_desk))
            )
            .slice(0, pageSize)
            .map((article: any) => ({
                id: `nyt-${article._id}`,
                title: article.headline.main,
                description: article.abstract,
                url: article.web_url,
                publishedAt: article.pub_date,
                source: { id: "nyt", name: "New York Times" },
                imageUrl: `https://www.nytimes.com/${article.multimedia[0].url}`,
                author: article.byline?.original,
                category: article.news_desk?.toLowerCase(),
            }));
    } catch (error) {
        console.error("Error fetching from NYT:", error);
        return [];
    }
}

async function fetchGuardian(
    query: string,
    categories: string[],
    page = 1,
    pageSize = 10
): Promise<NewsArticle[]> {
    try {
        const url = new URL(import.meta.env.VITE_REACT_APP_THE_GUARDIAN_API_URL);
        url.searchParams.append("api-key", GUARDIAN_API_KEY);

        // Handle category-based query
        const apiCategories = categories
            .map(
                (cat) => categoryMapping[cat as keyof typeof categoryMapping]?.guardian
            )
            .filter(Boolean);
        const searchQuery =
            query || (apiCategories.length ? apiCategories.join(" OR ") : "");
        url.searchParams.append("q", searchQuery);

        url.searchParams.append("page", page.toString());
        url.searchParams.append("page-size", pageSize.toString());
        url.searchParams.append("show-fields", "thumbnail,byline,trailText");

        if (apiCategories.length) {
            url.searchParams.append("section", apiCategories.join("|"));
        }

        const res = await fetch(url.toString());
        if (!res.ok) throw new Error("Guardian API request failed");

        const data = await res.json();
        return data.response.results
            .filter((article: any) => article.fields?.thumbnail)
            .map((article: any) => ({
                id: `guardian-${article.id}`,
                title: article.webTitle,
                description: article.fields?.trailText,
                url: article.webUrl,
                publishedAt: article.webPublicationDate,
                source: { id: "guardian", name: "The Guardian" },
                imageUrl: article.fields?.thumbnail,
                author: article.fields?.byline,
                category: article.sectionName?.toLowerCase(),
            }));
    } catch (error) {
        console.error("Error fetching from Guardian:", error);
        return [];
    }
}

export async function fetchNews(
    query: string,
    categories: string[],
    page = 1,
    pageSize = 10
): Promise<NewsArticle[]> {
    const providers: NewsProvider[] = ["newsapi", "nyt", "guardian"];

    const promises = providers.map((provider) => {
        switch (provider) {
            case "newsapi":
                return fetchWorldNewsApi(query, categories, page, pageSize);
            case "nyt":
                return fetchNYT(query, categories, page, pageSize);
            case "guardian":
                return fetchGuardian(query, categories, page, pageSize);
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
