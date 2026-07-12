import { DRAG_TYPE } from "./PropertyCard.jsx";
import { getPropertyImages } from "../utils/images.js";
import { formatPrice } from "../utils/search.js";

export default function FavouritesPanel({properties,favouriteIds,onAdd,onRemove,onClear,onOpen}) {
  const items = favouriteIds
    .map((id) => properties.find((p) => p.id === id)) 
    .filter(Boolean); // Remove empty values if a property is not found.

  // This function runs while a property is being dragged over the panel.
  function handleDragOver(e) {
    e.preventDefault(); // Allows the property to be dropped here
    e.dataTransfer.dropEffect = "copy"; // Shows copy action while dragging.
  }

  // This function runs when a property is dropped into the favorite.
  function handleDrop(e) {
    e.preventDefault();  // Stops the normal browser drop action.
    const id =   // Gets the property ID from the dragged item.
      e.dataTransfer.getData(DRAG_TYPE) ||
      e.dataTransfer.getData("text/plain");

    // If a valid ID exists, add it to favourites.
    if (id) onAdd(id);
  }

  return (

    // Sidebar that displays favourite properties.
    <aside
      className="fav-panel"
      onDragOver={handleDragOver} // Allows dragging properties into this area.
      onDrop={handleDrop} // Calls function when a property is dropped.
    >

      {/* Header section of the favourites panel */}
      <div className="fav-head">

        {/* Display the title and the number of favourite properties */}
        <h3>
          Favourites
          <span className="fav-count">
            ({items.length})
          </span>
        </h3>

        {/* Show the Clear All button only if favourites exist */}
        {items.length > 0 && (
          <button
            className="link-btn small"
            onClick={onClear}
          >
            Clear all
          </button>
        )}
      </div>

      {/* If no favourites exist, show a message */}
      {items.length === 0 ? (

        <p className="fav-empty">
          Drag properties here to save them.
        </p>

      ) : (

        // Otherwise display all favourite properties.
        <ul className="fav-list">

          {/* Loop through each favourite property */}
          {items.map((p) => {

            // Get the image gallery of the property.
            const { gallery } = getPropertyImages(p.id);

            return (

              // One favourite property item.
              <li
                key={p.id}
                className="fav-item"
              >

                {/* Display the first property image */}
                <img
                  src={gallery[0]}
                  alt={p.location}

                  // Open the property details when clicked.
                  onClick={() => onOpen(p.id)}
                />

                {/* Property information */}
                <div className="fav-info">

                  {/* Property location button */}
                  <button
                    className="fav-name"

                    // Open details page.
                    onClick={() => onOpen(p.id)}
                  >
                    {p.location}
                  </button>

                  {/* Display the formatted property price */}
                  <span className="fav-price">
                    {formatPrice(p.price)}
                  </span>

                </div>

                {/* Remove property from favourites */}
                <button
                  className="fav-remove"

                  // Accessibility label for screen readers.
                  aria-label="Remove favourite"

                  // Remove this property from favourites.
                  onClick={() => onRemove(p.id)}
                >
                  ✕
                </button>

              </li>
            );
          })}

        </ul>
      )}

    </aside>
  );
}