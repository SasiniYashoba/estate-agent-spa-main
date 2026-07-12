// App.jsx
// Top-level component. Holds the shared state (properties list, search results,
// favourites, which page to show) and glues the smaller components together.

import { useEffect, useState } from "react";
import propertiesData from "./data/properties.json";        // Static JSON list of 7 properties
import { filterProperties } from "./utils/search.js";
import {
  loadFavourites, saveFavourites,
  addFavourite, removeFavourite, clearFavourites,
} from "./utils/favourites.js";

import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import SearchForm from "./components/SearchForm.jsx";
import PropertyCard, { DRAG_TYPE } from "./components/PropertyCard.jsx";
import FavouritesPanel from "./components/FavouritesPanel.jsx";
import PropertyDetail from "./components/PropertyDetail.jsx";

import "./App.css";

export default function App() {
  const all = propertiesData.properties;                    // Full list of properties from JSON

  const [results, setResults] = useState(all);              // Currently visible search results
  const [favourites, setFavourites] = useState([]);         // Array of property ids
  const [openId, setOpenId] = useState(null);               // If set, we're viewing that property

  // On first load, restore favourites from localStorage.
  useEffect(() => {
    setFavourites(loadFavourites());
  }, []);

  // Whenever favourites change, write them back to localStorage.
  useEffect(() => {
    saveFavourites(favourites);
  }, [favourites]);

  // Called by SearchForm when the user submits or resets the form.
  function handleSearch(criteria) {
    setResults(filterProperties(all, criteria));
  }

  // Toggle a single favourite (used by the heart button).
  function toggleFav(id) {
    setFavourites((prev) => prev.includes(id) ? removeFavourite(prev, id) : addFavourite(prev, id));
  }

  // Handlers used by the FavouritesPanel.
  function addFav(id)    { setFavourites((prev) => addFavourite(prev, id)); }
  function removeFav(id) { setFavourites((prev) => removeFavourite(prev, id)); }
  function clearAll()    { setFavourites(clearFavourites()); }

  // Dropping a favourite BACK onto the results grid should remove it from favourites.
  function handleResultsDrop(e) {
    const id = e.dataTransfer.getData(DRAG_TYPE) || e.dataTransfer.getData("text/plain");
    if (id && favourites.includes(id)) removeFav(id);
  }

  // Find the currently-open property (if any) so we can render its detail page.
  const openProperty = openId ? all.find((p) => p.id === openId) : null;

  return (
    <div className="app">
      <Header />

      <main className="main">
        {openProperty ? (
          // ----- Detail page -----
          <PropertyDetail
            property={openProperty}
            onBack={() => setOpenId(null)}
            isFavourite={favourites.includes(openProperty.id)}
            onToggleFavourite={toggleFav}
          />
        ) : (
          // ----- Search page -----
          <div className="layout">
            <div className="layout-left">
              <SearchForm onSearch={handleSearch} />

              <section
                className="results"
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleResultsDrop}
              >
                <h2 className="results-title">
                  {results.length} propert{results.length === 1 ? "y" : "ies"} found
                </h2>

                {results.length === 0 ? (
                  <p className="empty">No properties match your search. Try widening your filters.</p>
                ) : (
                  <div className="grid">
                    {results.map((p) => (
                      <PropertyCard
                        key={p.id}
                        property={p}
                        isFavourite={favourites.includes(p.id)}
                        onToggleFavourite={toggleFav}
                        onOpen={setOpenId}
                      />
                    ))}
                  </div>
                )}
              </section>
            </div>

            <FavouritesPanel
              properties={all}
              favouriteIds={favourites}
              onAdd={addFav}
              onRemove={removeFav}
              onClear={clearAll}
              onOpen={setOpenId}
            />
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
