import { NewsArticle } from "@/types/news";
import { categoryMapping } from "@/lib/storage";

const NYT_API_KEY = import.meta.env.VITE_REACT_APP_NYT_API_KEY;

export async function fetchNYT(
    query: string,
    categories: string[],
    page = 1,
    pageSize = 10,
    fromDate: string,
    toDate: string,
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

        if (fromDate) {
            url.searchParams.append("begin_date", fromDate.replaceAll("-", ""));
        }

        if (toDate) {
            url.searchParams.append("end_date", toDate.replaceAll("-", ""));
        }

        url.searchParams.append("page", page.toString());
        url.searchParams.append(
            "fl",
            "headline,abstract,web_url,pub_date,byline,multimedia,news_desk"
        );

        const res = await fetch(url.toString());
        if (!res.ok) throw new Error("NYT API request failed");

        const data = await res.json();
        const createdData = data.response.docs
            .filter(
                (article: any) =>
                    article.multimedia?.length
            )
            .map((article: any) => {
                return {
                id: `nyt-${article._id}`,
                title: article.headline.main,
                description: article.abstract,
                url: article.web_url,
                publishedAt: article.pub_date,
                source: { id: "nyt", name: "New York Times" },
                imageUrl: `https://www.nytimes.com/${article.multimedia[0].url}`,
                author: article.byline?.original,
                category: article.news_desk?.toLowerCase(),
            }});
        return createdData;
    } catch (error) {
        console.error("Error fetching from NYT:", error);
        return [];
    }
}