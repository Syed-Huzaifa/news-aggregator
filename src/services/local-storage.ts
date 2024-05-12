// local-storage.ts

// Set data in localStorage
export function setLocalStorageData(key: string, data: any): void {
    localStorage.setItem(key, JSON.stringify(data));
}

// Get data from localStorage
export function getLocalStorageData(key: string): any {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
}