import { UserPreferences } from '@/types/news';

const PREFERENCES_KEY = 'news_preferences';

export const NEWS_CATEGORIES = [
    'business',
    'technology',
    'sports',
    'entertainment',
    'health',
    'science',
    'politics',
    'world'
] as const;

const defaultPreferences: UserPreferences = {
    categories: ['technology', 'business'], // Default categories
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
            categories: parsed.categories?.length ? parsed.categories : defaultPreferences.categories
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