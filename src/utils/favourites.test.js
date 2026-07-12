// Unit tests for favourites helpers (written in the flat test() / expect() style).
import { test, expect } from 'vitest';
import { addFavourite, removeFavourite, clearFavourites } from './favourites.js';

// adds a property to favourites
test("adds a property to favourites", () => {
  const favourites = [];
  const property = { id: "prop1", price: 250000 };

  const result = addFavourite(favourites, property.id);

  expect(result.length).toBe(1);
  expect(result[0]).toBe("prop1");
});

// prevents duplicate properties in favourites
test("prevents duplicate properties in favourites", () => {
  const favourites = ["prop1"];
  const duplicate = { id: "prop1", price: 250000 };

  const result = addFavourite(favourites, duplicate.id);

  expect(result.length).toBe(1);
});

// removes a property from favourites
test("removes a property from favourites", () => {
  const favourites = ["prop1", "prop2"];

  const result = removeFavourite(favourites, "prop1");

  expect(result.length).toBe(1);
  expect(result[0]).toBe("prop2");
});

// clears all favourites
test("clears all favourites", () => {
  const result = clearFavourites();

  expect(result.length).toBe(0);
});
