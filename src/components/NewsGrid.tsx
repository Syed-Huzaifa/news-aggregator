import { useInfiniteQuery } from "@tanstack/react-query";
import { NewsCard } from "./NewsCard";
import { fetchNews } from "@/lib/api";
import { NewsFilters } from "@/types/news";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { loadPreferences } from "@/lib/storage";
import { cn } from "@/lib/utils";

interface NewsGridProps {
    filters: NewsFilters;
}

export function NewsGrid({ filters }: NewsGridProps) {
    const { ref, inView } = useInView();
    const preferences = loadPreferences();

    const {
        data,
        error,
        fetchNextPage,
        hasNextPage,
        isFetching,
        isFetchingNextPage,
    } = useInfiniteQuery({
        queryKey: ["news", filters, preferences.articlesPerPage],
        queryFn: ({ pageParam = 1 }) =>
            fetchNews(filters.query, filters.categories, pageParam, preferences.articlesPerPage, filters.sources, filters.toDate, filters.fromDate),
        initialPageParam: 1,
        getNextPageParam: (_, pages) => pages.length + 1,
    });

    useEffect(() => {
        if (inView && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    }, [inView, hasNextPage, fetchNextPage]);

    if (error) {
        return (
            <div className="text-center text-destructive p-4">
                Error loading news: {error.message}
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data?.pages.map((group) =>
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