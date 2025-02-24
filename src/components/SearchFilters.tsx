import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuCheckboxItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { NewsFilters } from "@/types/news";
import { Filter } from "lucide-react";
import { NEWS_CATEGORIES } from "@/lib/storage";

interface SearchFiltersProps {
    filters: NewsFilters;
    onFiltersChange: (filters: NewsFilters) => void;
}

export function SearchFilters({ filters, onFiltersChange }: SearchFiltersProps) {
    const handleSearch = (query: string) => {
        onFiltersChange({ ...filters, query });
    };

    const toggleCategory = (category: string) => {
        const categories = filters.categories.includes(category)
            ? filters.categories.filter((c) => c !== category)
            : [...filters.categories, category];

        // Ensure we always have at least one category selected
        if (categories.length > 0) {
            onFiltersChange({ ...filters, categories });
        }
    };

    return (
        <div className="flex flex-col sm:flex-row gap-4 items-center mb-8">
            <div className="relative flex-1 w-full">
                <Input
                    placeholder="Search news..."
                    onChange={(e) => handleSearch(e.target.value)}
                    className="w-full"
                />
            </div>

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="w-full sm:w-auto">
                        <Filter className="mr-2 h-4 w-4" />
                        Categories
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>Categories</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {NEWS_CATEGORIES.map((category) => (
                        <DropdownMenuCheckboxItem
                            key={category}
                            checked={filters.categories.includes(category)}
                            onCheckedChange={() => toggleCategory(category)}
                        >
                            <span className="capitalize">{category}</span>
                        </DropdownMenuCheckboxItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}