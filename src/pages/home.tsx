import { useState } from "react";
import { NewsGrid } from "@/components/NewsGrid";
import { SearchFilters } from "@/components/SearchFilters";
import { ThemeToggle } from "@/components/ThemeToggle";
import { NewsFilters as NewsFiltersType } from "@/types/news";
import { loadPreferences } from "@/lib/storage";
import throttle from "lodash.throttle"

export default function Home() {
  const preferences = loadPreferences();
  const [filters, setFilters] = useState<NewsFiltersType>({
    query: "",
    categories: preferences.categories,
    sortBy: "newest",
  });

  const handleChange = throttle((value: any) => setFilters(value), 3000, { leading: false })

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">News Aggregator</h1>
            <div className="flex items-center gap-2">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <SearchFilters filters={filters} onFiltersChange={handleChange} />
        <NewsGrid filters={filters} />
      </main>
    </div>
  );
}