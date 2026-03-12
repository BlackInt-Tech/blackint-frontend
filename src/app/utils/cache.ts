export const CACHE_DURATION = 1000 * 60 * 60 * 24; 

export function getCachedData<T>(key: string): T | null {
  const cached = localStorage.getItem(key);
  const cachedTime = localStorage.getItem(`${key}_time`);

  if (!cached || !cachedTime) return null;

  const isExpired = Date.now() - Number(cachedTime) > CACHE_DURATION;
  if (isExpired) return null;

  return JSON.parse(cached);
}

export function setCachedData(key: string, data: any) {
  localStorage.setItem(key, JSON.stringify(data));
  localStorage.setItem(`${key}_time`, Date.now().toString());
}