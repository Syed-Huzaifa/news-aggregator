import { UserPreferences } from '@/types/news';

const PREFERENCES_KEY = 'news_preferences';

export const NEWS_SOURCES = ['worldnews', 'nyt', 'guardian'];

export const NEWS_CATEGORIES = [
    'business',
    'technology',
    'sports',
    'entertainment',
    'health',
    'science',
    'politics',
    'world'
];

export const categoryMapping = {
    business: {
        worldapi: "business",
        nyt: "Business",
        guardian: "business",
    },
    technology: {
        worldapi: "technology",
        nyt: "Technology",
        guardian: "technology",
    },
    sports: {
        worldapi: "sports",
        nyt: "Sports",
        guardian: "sport",
    },
    entertainment: {
        worldapi: "entertainment",
        nyt: "Arts",
        guardian: "culture",
    },
    health: {
        worldapi: "health",
        nyt: "Health",
        guardian: "healthcare",
    },
    science: {
        worldapi: "science",
        nyt: "Science",
        guardian: "science",
    },
    politics: {
        worldapi: "politics",
        nyt: "Politics",
        guardian: "politics",
    },
    world: {
        worldapi: "world",
        nyt: "World",
        guardian: "world",
    },
};

const defaultPreferences: UserPreferences = {
    categories: ['technology', 'business'], // Default categories
    sources: ['worldnews', 'nyt', 'guardian'], // Default sources
    theme: 'system',
    showImages: true,
    articlesPerPage: 10
};

export function savePreferences(preferences: UserPreferences): void {
    localStorage.setItem(PREFERENCES_KEY, JSON.stringify(preferences));
}

export function loadPreferences(): UserPreferences {
    const stored = localStorage.getItem(PREFERENCES_KEY);
    if (!stored) return defaultPreferences;

    try {
        const parsed = JSON.parse(stored) as Partial<UserPreferences>;
        return {
            ...defaultPreferences,
            ...parsed,
            // Ensure we always have at least one category selected
            categories: parsed.categories?.length ? parsed.categories : defaultPreferences.categories,
            sources: parsed.sources?.length ? parsed.sources : defaultPreferences.sources
        };
    } catch {
        return defaultPreferences;
    }
}

export function setTheme(theme: UserPreferences['theme']): void {
    const prefs = loadPreferences();
    savePreferences({ ...prefs, theme });

    if (theme === 'dark') {
        document.documentElement.classList.add('dark');
    } else if (theme === 'light') {
        document.documentElement.classList.remove('dark');
    }
}