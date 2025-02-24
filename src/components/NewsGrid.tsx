import { useInfiniteQuery } from "@tanstack/react-query";
import { NewsCard } from "./NewsCard";
import { fetchNews } from "@/lib/api";
import { NewsFilters } from "@/types/news";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { loadPreferences } from "@/lib/storage";
import { cn } from "@/lib/utils";

interface NewsGridProps {
    filters: NewsFilters;
}

export function NewsGrid({ filters }: NewsGridProps) {
    const { ref, inView } = useInView();
    const preferences = loadPreferences();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    if (!filters || !Array.isArray(filters.categories) || !Array.isArray(filters.sources)) {
        return <div className="text-center text-destructive p-4">Invalid filters provided.</div>;
    }

    const {
        data,
        error,
        fetchNextPage,
        hasNextPage,
        isFetching,
        isFetchingNextPage,
        refetch,
    } = useInfiniteQuery({
        queryKey: ["news", filters, preferences.articlesPerPage],
        queryFn: async ({ pageParam = 1 }) => {
            try {
                const news = await fetchNews(
                    filters.query,
                    filters.categories,
                    pageParam,
                    preferences.articlesPerPage,
                    filters.sources,
                    filters.toDate,
                    filters.fromDate,
                    filters.author
                );

                if (!news.length) {
                    throw new Error("No articles found.");
                }

                return news;
            } catch (error: any) {
                console.error("Error fetching news:", error);
                setErrorMessage(error.message || "Failed to load news.");
                throw error;
            }
        },
        initialPageParam: 1,
        getNextPageParam: (_, pages) => pages.length + 1,
        retry: false,
    });

    useEffect(() => {
        if (inView && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    }, [inView, hasNextPage, fetchNextPage, isFetchingNextPage]);

    if (error) {
        return (
            <div className="text-center text-destructive p-4">
                <p>Error loading news: {errorMessage}</p>
                <button
                    className="mt-2 bg-primary text-white px-4 py-2 rounded-md"
                    onClick={() => {
                        setErrorMessage(null);
                        refetch();
                    }}
                >
                    Retry
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data?.pages.flatMap((group) =>
                    group.map((article) => (
                        <NewsCard key={article.id} article={article} showImages={preferences.showImages} />
                    ))
                )}
            </div>

            <div ref={ref} className="flex justify-center p-4">
                {isFetching && (
                    <div className={cn("flex space-x-1", "scale-75")}>
                        {[...Array(3)].map((_, i) => (
                            <div
                                key={i}
                                className={cn(
                                    "w-4 h-4 bg-primary rounded-full animate-pulse",
                                    i === 1 && "animation-delay-150",
                                    i === 2 && "animation-delay-300",
                                )}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}