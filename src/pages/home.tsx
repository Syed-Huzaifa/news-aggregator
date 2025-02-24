import { useState } from "react";
import { NewsGrid } from "@/components/NewsGrid";
import { SearchField } from "@/components/SearchFilters";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Filters } from "@/components/Filters";
import { NewsFilters as NewsFiltersType } from "@/types/news";
import { loadPreferences } from "@/lib/storage";
import throttle from "lodash.throttle"

export default function Home() {
  const preferences = loadPreferences();
  const [filters, setFilters] = useState<NewsFiltersType>({
    query: "",
    categories: preferences.categories,
    author: "",
    sources: preferences.sources,
    fromDate: "",
    toDate: "",
    sortBy: "newest",
  });

  const handleChange = throttle((value: any) => setFilters(value), 1500, { leading: false })

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
        <div className="flex">
          <SearchField filters={filters} onFiltersChange={handleChange} />
          <Filters filters={filters} onFiltersChange={handleChange} />
        </div>
        <NewsGrid filters={filters} />
      </main>
    </div>
  );
}