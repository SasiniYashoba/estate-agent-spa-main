import { useState } from "react";                          

// Empty starting state for the form. Using empty strings keeps the inputs "controlled".
const EMPTY = {
  type: "Any",
  minPrice: "",
  maxPrice: "",
  minBeds: "",
  maxBeds: "",
  postcode: "",
  addedAfter: "",
};

export default function SearchForm({ onSearch }) {
  const [criteria, setCriteria] = useState(EMPTY);        // Current form state

  // Update ONE field when the user types / selects a value.
  function update(field, value) {
    setCriteria((old) => ({ ...old, [field]: value }));   // Keeps old values and only updates the selected field.
  }

  // When the form is submitted, pass the criteria up to the parent (App.jsx).
  function handleSubmit(e) {
    e.preventDefault();                                   // Stop the browser from reloading the page
    onSearch(criteria);                                   // Tell the parent to run the search
  }

  // Reset the form back to empty and immediately show all properties.
  function handleReset() {
    setCriteria(EMPTY);
    onSearch(EMPTY);
  }

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <h2 className="search-title">Search Properties</h2>

      {/* Row 1: property type + postcode */}
      <div className="field-row">
        <div className="field-box">                       {/* Individual box for one field */}
          <label htmlFor="type">Property Type</label>
          <select
            id="type"
            value={criteria.type}
            onChange={(e) => update("type", e.target.value)}
          >
            <option value="Any">Any</option>
            <option value="House">House</option>
            <option value="Flat">Flat</option>
          </select>
        </div>

        <div className="field-box">
          <label htmlFor="postcode">Postcode Area</label>
          <input
            id="postcode"
            type="text"
            placeholder="e.g. BR5"
            value={criteria.postcode}
            onChange={(e) => update("postcode", e.target.value)}
          />
        </div>
      </div>

      {/* Row 2: min price + max price */}
      <div className="field-row">
        <div className="field-box">
          <label htmlFor="minPrice">Min Price (£)</label>
          <input
            id="minPrice"
            type="number"
            min="0"
            placeholder="Min price"
            value={criteria.minPrice}
            onChange={(e) => update("minPrice", e.target.value)}
          />
        </div>

        <div className="field-box">
          <label htmlFor="maxPrice">Max Price (£)</label>
          <input
            id="maxPrice"
            type="number"
            min="0"
            placeholder="Max price"
            value={criteria.maxPrice}
            onChange={(e) => update("maxPrice", e.target.value)}
          />
        </div>
      </div>

      {/* Row 3: min beds + max beds */}
      <div className="field-row">
        <div className="field-box">
          <label htmlFor="minBeds">Min Bedrooms</label>
          <input
            id="minBeds"
            type="number"
            min="0"
            placeholder="Min beds"
            value={criteria.minBeds}
            onChange={(e) => update("minBeds", e.target.value)}
          />
        </div>

        <div className="field-box">
          <label htmlFor="maxBeds">Max Bedrooms</label>
          <input
            id="maxBeds"
            type="number"
            min="0"
            placeholder="Max beds"
            value={criteria.maxBeds}
            onChange={(e) => update("maxBeds", e.target.value)}
          />
        </div>
      </div>

      {/* Row 4: added after date (own row so it has plenty of space) */}
      <div className="field-row">
        <div className="field-box wide">
          <label htmlFor="addedAfter">Date Added After</label>
          <input
            id="addedAfter"
            type="date"
            value={criteria.addedAfter}
            onChange={(e) => update("addedAfter", e.target.value)}
          />
        </div>
      </div>

      {/* Action buttons */}
      <div className="form-actions">
        <button type="submit" className="btn btn-primary">Search</button>
        <button type="button" className="btn btn-ghost" onClick={handleReset}>Reset</button>
      </div>
    </form>
  );
}
