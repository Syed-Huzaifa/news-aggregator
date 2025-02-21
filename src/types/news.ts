export interface NewsSource {
  id: string;
  name: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  description: string;
  url: string;
  publishedAt: string;
  source: NewsSource;
  imageUrl?: string;
  author?: string;
  category?: string;
}

export type NewsProvider = "newsapi" | "nyt" | "guardian";

export interface NewsFilters {
  query: string;
  categories: string[];
  sortBy: "relevance" | "newest" | "oldest";
}

export interface UserPreferences {
  categories: string[];
  theme: "light" | "dark" | "system";
  showImages: boolean;
  articlesPerPage: number;
}
