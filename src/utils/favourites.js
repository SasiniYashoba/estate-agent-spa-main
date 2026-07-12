// utils/favourites.js
// Simple helpers for storing the user's favourite property ids in localStorage.
// localStorage keeps data even after the browser tab is closed, so favourites

const STORAGE_KEY = "estate-agent-favourites";           // The key we use in localStorage

// Read the saved list of favourite ids. Returns an empty array if nothing is saved
// or if the stored value is somehow broken.
export function loadFavourites() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);        // Get the raw string from storage
    if (!raw) return [];                                  // Nothing stored yet -> empty list
    const parsed = JSON.parse(raw);                       // Parse the JSON string back to an array
    return Array.isArray(parsed) ? parsed : [];           // Guard against bad data
  } catch {
    return [];                                            // If parsing fails, start fresh
  }
}

// Write the current list of favourite ids back to localStorage.
export function saveFavourites(ids) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
}

// Add a property id to the favourites list (avoiding duplicates).
export function addFavourite(ids, id) {
  if (ids.includes(id)) return ids;                       // Already saved -> return unchanged
  return [...ids, id];                                    // Return a NEW array with the id appended
}

// Remove a single property id from the favourites list.
export function removeFavourite(ids, id) {
  return ids.filter((x) => x !== id);                     // Keep everything except this id
}

// Clear all favourites.
export function clearFavourites() {
  return [];
}
