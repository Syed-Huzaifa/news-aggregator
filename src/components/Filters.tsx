import { Search, SlidersHorizontal } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Label } from "./ui/label";
import { NEWS_CATEGORIES, NEWS_SOURCES } from "@/lib/storage";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Checkbox } from "@/components/ui/checkbox"
import { useState } from "react";
import { NewsFilters } from "@/types/news";

interface SearchFiltersProps {
    filters: NewsFilters;
    onFiltersChange: (filters: NewsFilters) => void;
}

export function Filters({ filters, onFiltersChange }: SearchFiltersProps) {
  const [query, setQuery] = useState(filters.query);
  const [category, setCategory] = useState(filters.categories?.[0] || "");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [selectedSources, setSelectedSources] = useState<string[]>([]);
  const [authorQuery, setAuthorQuery] = useState("");

    const handleCheckboxChange = (src: string) => {
        setSelectedSources((prev) =>
            prev.includes(src) ? prev.filter((item) => item !== src) : [...prev, src]
        );
    };

  const handleSearch = () => {
    onFiltersChange({
      ...filters,
      query,
      categories: category ? [category] : [],
      author: authorQuery,
      sources: selectedSources.length ? [...selectedSources] : ["worldnews", "nyt", "guardian"],
      fromDate,
      toDate,
    });
  };

  return (
    <div className="flex gap-2">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon">
            <SlidersHorizontal className="w-4 h-4" />
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Filters</SheetTitle>
            <SheetDescription>
              Refine your search with these filters
            </SheetDescription>
          </SheetHeader>
          <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="category">Category</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {NEWS_CATEGORIES.map((cat) => (
                      <SelectItem key={cat} value={cat.toLowerCase()}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            {NEWS_SOURCES.map((src) => (
                <div className="flex gap-2">
                    <Checkbox id="sources" checked={selectedSources.includes(src)} onCheckedChange={() => handleCheckboxChange(src)} value={src} />
                        <Label htmlFor="sources">{src}</Label>
                </div>
            ))}
            <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Input placeholder="Enter author name..." onChange={(e) => setAuthorQuery(e.target.value)} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="from">From Date</Label>
              <Input
                type="date"
                id="from"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="to">To Date</Label>
              <Input
                type="date"
                id="to"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
              />
            </div>
            <Button onClick={handleSearch}>Apply Filters</Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}