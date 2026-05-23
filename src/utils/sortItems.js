/**
 * Sorts and filters a list of content items based on the given sort mode.
 *
 * @param {Array}  items  - The raw content array for the active category.
 * @param {string} sortId - One of: "trending" | "popular" | "newest" | "upcoming" | "top"
 * @returns {Array} A new sorted/filtered array (never mutates the original).
 */
export function sortItems(items, sortId) {
  switch (sortId) {
    case "trending":
      return [...items].sort((a, b) => b.votes - a.votes);
    case "popular":
      return [...items].sort((a, b) => b.votes * b.rating - a.votes * a.rating);
    case "newest":
      return [...items]
        .filter((i) => i.status === "released")
        .sort((a, b) => b.year - a.year);
    case "upcoming":
      return [...items].filter((i) => i.status === "upcoming");
    case "top":
      return [...items]
        .filter((i) => i.rating > 0)
        .sort((a, b) => b.rating - a.rating);
    default:
      return items;
  }
}
