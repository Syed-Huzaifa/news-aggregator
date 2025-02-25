import { NewsArticle } from "@/types/news";
import { categoryMapping } from "@/lib/storage";

const GUARDIAN_API_KEY = import.meta.env.VITE_REACT_APP_THE_GUARDIAN_API_KEY;

export async function fetchGuardian(
    query: string,
    categories: string[],
    page = 1,
    pageSize = 10,
    toDate: string,
    fromDate: string
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
        url.searchParams.append("to-date", toDate)
        url.searchParams.append("from-date", fromDate)
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