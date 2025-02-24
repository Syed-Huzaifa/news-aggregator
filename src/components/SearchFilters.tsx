import { Input } from "@/components/ui/input";
import { NewsFilters } from "@/types/news";

interface SearchFiltersProps {
    filters: NewsFilters;
    onFiltersChange: (filters: NewsFilters) => void;
}

export function SearchField({ filters, onFiltersChange }: SearchFiltersProps) {
    const handleSearch = (query: string) => {
        onFiltersChange({ ...filters, query });
    };

    return (
        <div className="flex w-full flex-col sm:flex-row gap-4 items-center mb-8">
            <div className="relative flex-1 w-full">
                <Input
                    placeholder="Search news..."
                    onChange={(e) => handleSearch(e.target.value)}
                    className="w-full"
                />
            </div>
        </div>
    );
}