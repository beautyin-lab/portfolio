const STORAGE_PREFIX = 'demo_';

function buildKey(siteSlug: string, collection: string): string {
  return `${STORAGE_PREFIX}${siteSlug}_${collection}`;
}

export function get<T>(siteSlug: string, collection: string): T[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(buildKey(siteSlug, collection));
    if (!raw) return [];
    return JSON.parse(raw) as T[];
  } catch {
    return [];
  }
}

export function set<T>(siteSlug: string, collection: string, data: T[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(buildKey(siteSlug, collection), JSON.stringify(data));
  } catch {
    // localStorage quota exceeded or unavailable — silently fail
  }
}

export function append<T extends object>(
  siteSlug: string,
  collection: string,
  item: T,
): T & { id: string } {
  const existing = get<T & { id: string }>(siteSlug, collection);
  const newItem = {
    ...item,
    id: ('id' in item ? (item as { id?: string }).id : undefined) ?? crypto.randomUUID(),
  } as T & { id: string };
  set(siteSlug, collection, [...existing, newItem]);
  return newItem;
}

export function remove(siteSlug: string, collection: string, id: string): boolean {
  const existing = get<{ id: string }>(siteSlug, collection);
  const next = existing.filter((item) => item.id !== id);
  if (next.length === existing.length) return false;
  set(siteSlug, collection, next);
  return true;
}

export function clear(siteSlug?: string): void {
  if (typeof window === 'undefined') return;
  const keysToRemove: string[] = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (!key) continue;
    if (!key.startsWith(STORAGE_PREFIX)) continue;
    if (siteSlug && !key.startsWith(`${STORAGE_PREFIX}${siteSlug}_`)) continue;
    keysToRemove.push(key);
  }
  keysToRemove.forEach((key) => localStorage.removeItem(key));
}
