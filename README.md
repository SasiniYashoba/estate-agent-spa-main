# Haven Estates - Estate Agent SPA

Coursework: 5COSC026W Client-Side Web Development.

A single-page React application (Vite + React 18) that mimics a small
estate agent website (like Rightmove/Zoopla) with a search page, a
property details page and a drag-and-drop favourites list.

## Features (mapped to the coursework brief)

1. **JSON data** - 7 properties in `src/data/properties.json`.
2. **Search page** - `SearchForm` component with dropdown for type,
   number inputs for price, spinners for bedrooms, date pickers and a
   postcode field with suggestions.
3. **Search functionality** - pure client-side filter in
   `src/utils/search.js` (unit tested).
4. **Results** - responsive cards showing photo, price, type, bedrooms,
   short description and location.
5. **Property page** - large image + thumbnails, tabs for description,
   floor plan and Google map.
6. **Favourites** - draggable cards, drop zone sidebar, remove button,
   clear-all button, duplicates prevented, saved in `localStorage`.
7. **Responsive design** - hand-written media queries in `src/App.css`.
8. **Security** - CSP `<meta>` tag; React escapes all string output.
9. **Tests** - Vitest tests for search and favourites logic.

## Run locally

```bash
npm install
npm run dev      # start the app on http://localhost:5173
npm test         # run unit tests
npm run build    # production build
```

## Structure

```
src/
  assets/               property photos and floor plans
  components/           small React components
  data/
    properties.json     the 7 properties
  utils/
    search.js           search / filter logic
    favourites.js       favourites helpers
  App.jsx               main app (routing + state)
  App.css               component styles + media queries
  index.css             base styles / design tokens
  main.jsx              React entry point
```
