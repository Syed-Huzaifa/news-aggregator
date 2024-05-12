export const useFilter = (filters) => {
    return {
        q: (filters.category).join(', '),
        sources: (filters.sources).join(', '),
        to: filters.date.to,
        from: filters.date.from
    }
}