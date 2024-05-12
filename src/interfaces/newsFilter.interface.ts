export interface NewsFilters {
    category: string[];
    source: string[];
    date: {
        to: string;
        from: string;
    }
}