/**
 * Centralized poster fetching service.
 *
 * - Anime  → Jikan API (MAL wrapper, free, no auth)
 * - Others → Wikipedia REST summary API (free, no auth)
 *
 * Both have module-level caches to avoid duplicate network calls.
 * Jikan requests are queued (400ms apart) to respect the 3 req/s rate limit.
 */

// ── Caches ────────────────────────────────────────────────────────────────────
const jikanCache = new Map();
const wikiCache  = new Map();

// ── Jikan queue (anime) ───────────────────────────────────────────────────────
let jikanQueue = Promise.resolve();

export function fetchAnimePoster(malId) {
  if (jikanCache.has(malId)) {
    return Promise.resolve(jikanCache.get(malId));
  }

  // Chain onto the queue with a 350ms gap to stay within rate limits
  const promise = jikanQueue.then(
    () =>
      new Promise((res) => setTimeout(res, 350)).then(() =>
        fetch(`https://api.jikan.moe/v4/anime/${malId}`)
          .then((r) => r.json())
          .then((data) => {
            const url =
              data?.data?.images?.jpg?.large_image_url ||
              data?.data?.images?.jpg?.image_url ||
              null;
            jikanCache.set(malId, url);
            return url;
          })
          .catch(() => null)
      )
  );

  // Advance the queue
  jikanQueue = promise.catch(() => {});

  return promise;
}

// ── Wikipedia summary API (K-drama, series, movies) ──────────────────────────
export function fetchWikiPoster(wikiSlug) {
  if (wikiCache.has(wikiSlug)) {
    return Promise.resolve(wikiCache.get(wikiSlug));
  }

  return fetch(
    `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(wikiSlug)}`
  )
    .then((r) => r.json())
    .then((data) => {
      const url =
        data?.originalimage?.source ||
        data?.thumbnail?.source ||
        null;
      wikiCache.set(wikiSlug, url);
      return url;
    })
    .catch(() => {
      wikiCache.set(wikiSlug, null);
      return null;
    });
}
