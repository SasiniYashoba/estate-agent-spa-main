// utils/search.js
// Pure functions for filtering property data. No React here on purpose:
// keeping logic pure makes it easy to unit-test with Vitest.

// Convert the property's { month, day, year } object into a real JavaScript Date.
// We need this so we can compare dates with the "added after" filter.
export function addedDate(property) {
  const months = [                                        // Month name -> index (0 = January)
    "January","February","March","April","May","June",
    "July","August","September","October","November","December",
  ];
  const monthIndex = months.indexOf(property.added.month); // Find the numeric month index
  return new Date(property.added.year, monthIndex, property.added.day); // Build a Date object
}

// Format a number of pounds as "£750,000". Used in the card and the detail page.
export function formatPrice(price) {
  return "£" + price.toLocaleString("en-GB");             // Adds commas for thousands
}

// Given ONE property and the user's search criteria, return true if it matches.
export function matches(property, criteria) {
  // Property type filter (House / Flat / Any).
  if (criteria.type && criteria.type !== "Any" && property.type !== criteria.type) {
    return false;                                         // Type doesn't match -> exclude
  }
  // Minimum price filter.
  if (criteria.minPrice !== "" && property.price < Number(criteria.minPrice)) {
    return false;                                         // Cheaper than requested -> exclude
  }
  // Maximum price filter.
  if (criteria.maxPrice !== "" && property.price > Number(criteria.maxPrice)) {
    return false;                                         // More expensive than requested -> exclude
  }
  // Minimum bedrooms filter.
  if (criteria.minBeds !== "" && property.bedrooms < Number(criteria.minBeds)) {
    return false;
  }
  // Maximum bedrooms filter.
  if (criteria.maxBeds !== "" && property.bedrooms > Number(criteria.maxBeds)) {
    return false;
  }
  // Postcode area filter (e.g. "BR5"). Case-insensitive prefix match.
  if (criteria.postcode && criteria.postcode.trim() !== "") {
    const wanted = criteria.postcode.trim().toUpperCase();
    if (!property.postcode.toUpperCase().startsWith(wanted)) {
      return false;
    }
  }
  // "Added after" date filter.
  if (criteria.addedAfter) {
    const after = new Date(criteria.addedAfter);          // Convert the input string to a Date
    if (addedDate(property) < after) {
      return false;                                       // Property is older than the cutoff
    }
  }
  return true;                                            // Passed every filter
}

// Apply matches() to an entire list of properties and return only those that match.
export function filterProperties(list, criteria) {
  return list.filter((p) => matches(p, criteria));
}
