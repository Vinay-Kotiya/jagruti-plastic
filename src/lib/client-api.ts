/** Thin fetch wrapper for admin client components. Throws Error(message) on non-2xx. */
export async function api<T = unknown>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, { ...init, headers: { "Content-Type": "application/json", ...init?.headers } });
  const json = await res.json().catch(() => null);
  if (!res.ok) {
    const fields = json?.error?.errors as Record<string, string[]> | undefined;
    const first = fields && Object.entries(fields)[0];
    throw new Error(first ? `${first[0]}: ${first[1][0]}` : json?.error?.message ?? "Request failed");
  }
  return json.data as T;
}
