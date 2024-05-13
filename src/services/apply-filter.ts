export const applyFilter = (filters) => {
    let params = {}
    if (filters?.category) {
        params = {
            ...params,
            q: filters.category.join(',')
        }
    }

    if (filters?.source) {
        params = {
            ...params,
            sources: filters.source.join(',')
        }
    }

    if (filters?.date?.to) {
        params = {
            ...params,
            to: filters.date.to
        }
    }

    if (filters?.date?.from) {
        params = {
            ...params,
            from: filters.date.from
        }
    }
    return params
}