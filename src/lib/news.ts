// import "server-only";

const DEFAULT_NEWS: Record<string, string[]> = {
  standings: [
    "Currently playing Live: Saint George vs Ethiopian Coffee on 07 Sep 2025 with score 2 to 1 | Status: Live - 67', Who will win?",
  ],
  futureMatches: [
    "Currently playing Live: Adama City vs Fasil Kenema on 07 Sep 2025 with score 0 to 0 | Status: Live - HT, Who will win?",
  ],
  pastMatches: [
    "Currently playing Live: Sidama Bunna vs Hawassa City on 07 Sep 2025 with score 1 to 3 | Status: Live - 80', Who will win?",
  ],
  liveScores: [],
};

export type FetchNewsOptions = {
  signal?: AbortSignal;
  leagues?: string;
  baseUrl?: string;
};

/**
 * Fetches football news from multiple endpoints.
 * Returns an object keyed by endpoint name with array of news strings.
 */
export async function fetchNews(
  opts: FetchNewsOptions = {}
): Promise<Record<string, string[]>> {
  const { signal, leagues = "ETH|EPL", baseUrl } = opts;

  const apiBase = baseUrl ?? process.env.NEXT_PUBLIC_API_BASE;
  if (!apiBase) {
    console.warn("No API base URL configured. Using default news.");
    return DEFAULT_NEWS;
  }

  const endpoints = [
    "/standings",
    "/futureMatches",
    "/pastMatches",
    "/liveScores",
  ];
  const allNews: Record<string, string[]> = {};

  try {
    for (const ep of endpoints) {
      const url = `${apiBase}/news${ep}`;
      console.log("Fetching news from:", url);

      const res = await fetch(url, {
        method: "GET",
        signal,
        next: { revalidate: 900 }, // cache 15 minutes
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) {
        console.error(`Failed to fetch ${ep}: ${res.status}`);
        continue;
      }

      const raw = await res.json();
      console.log(`Raw response for ${ep}:`, raw);

      // Normalize: allow raw to be array, or { items: [] }, or { message: [] }, etc.
      const items: string[] = Array.isArray(raw)
        ? raw
        : Array.isArray(raw?.items)
        ? raw.items
        : Array.isArray(raw?.message)
        ? raw.message
        : Array.isArray(raw?.news)
        ? raw.news
        : typeof raw?.message === "string"
        ? [raw.message]
        : [];

      const key = ep.replace("/", ""); 
      allNews[key] = items.filter((x): x is string => typeof x === "string");
    }

    console.log("All fetched news:", allNews);

    // If we didn’t fetch anything, fall back to default
    return Object.keys(allNews).length > 0 ? allNews : DEFAULT_NEWS;
  } catch (error) {
    console.error("Error fetching news:", error);
    return DEFAULT_NEWS;
  }
}
