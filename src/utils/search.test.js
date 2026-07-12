// Unit tests for search / filter logic (written in the flat test() / expect() style).
import { test, expect } from 'vitest';
import { filterProperties, matches, formatPrice, addedDate } from './search.js';

const sample = [
  { id: "prop1", type: "House", bedrooms: 3, price: 500000,  postcode: "BR1", added: { month: "January", day: 1,  year: 2024 } },
  { id: "prop2", type: "Flat",  bedrooms: 1, price: 250000,  postcode: "NW1", added: { month: "June",    day: 15, year: 2025 } },
  { id: "prop3", type: "House", bedrooms: 5, price: 1200000, postcode: "BR6", added: { month: "March",   day: 5,  year: 2023 } },
];

// matches a property by type
test("matches a property by type", () => {
  const result = matches(sample[0], { type: "House" });

  expect(result).toBe(true);
});

// excludes a property when type does not match
test("excludes a property when type does not match", () => {
  const result = matches(sample[1], { type: "House" });

  expect(result).toBe(false);
});

// matches a property within a price range
test("matches a property within a price range", () => {
  const result = matches(sample[0], { minPrice: 400000, maxPrice: 600000 });

  expect(result).toBe(true);
});

// excludes a property above the max price
test("excludes a property above the max price", () => {
  const result = matches(sample[2], { maxPrice: 600000 });

  expect(result).toBe(false);
});

// matches a property by postcode area (case insensitive)
test("matches a property by postcode area (case insensitive)", () => {
  const result = matches(sample[0], { postcode: "br" });

  expect(result).toBe(true);
});

// filters a list of properties by all criteria
test("filters a list of properties by all criteria", () => {
  const result = filterProperties(sample, { type: "House", maxPrice: 800000 });

  expect(result.length).toBe(1);
  expect(result[0].id).toBe("prop1");
});

// formats a price with the pound sign and separators
test("formats a price with the pound sign and separators", () => {
  const result = formatPrice(500000);

  expect(result).toBe("£500,000");
});

// converts the added object to a real Date
test("converts the added object to a real Date", () => {
  const result = addedDate(sample[0]);

  expect(result.getFullYear()).toBe(2024);
  expect(result.getMonth()).toBe(0);
});
