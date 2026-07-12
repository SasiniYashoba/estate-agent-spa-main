// components/PropertyCard.jsx
import { formatPrice } from "../utils/search.js";          // Price formatter (£1,234)
import { getPropertyImages } from "../utils/images.js";    // Gets img1.jpg for the card thumbnail

// It helps identify property data when dragging a property card.
const DRAG_TYPE = "application/x-haven-property";

export default function PropertyCard({ property, isFavourite, onToggleFavourite, onOpen }) {  // Receives property data and functions from the parent component.
  const { gallery } = getPropertyImages(property.id);     // get the image gallery
  const cover = gallery[0];  // Uses the first image as the main card image

  // Runs when the user starts dragging a property card.
  function handleDragStart(e) {
    e.dataTransfer.setData(DRAG_TYPE, property.id);       // Custom type -> our own drops
    e.dataTransfer.setData("text/plain", property.id);    // Plain text as a fallback
    e.dataTransfer.effectAllowed = "copy";                // Show the "copy" cursor to the user
  }

  return (
    <article
      className="property-card"
      draggable                                            // Makes the whole card draggable
      onDragStart={handleDragStart}
    >
      <div className="card-media">
        <img src={cover} alt={property.location} />       {/* show property cover page */}
        <span className="type-badge">{property.type}</span> {/* show flat or house */}
        <button
          type="button"
          className={"heart-btn " + (isFavourite ? "is-fav" : "")}
          aria-label={isFavourite ? "Remove from favourites" : "Add to favourites"}
          onClick={() => onToggleFavourite(property.id)} // call function to add or remove favorite
        >
          {isFavourite ? "♥" : "♡"}                        {/* Filled vs outline heart */}
        </button>
      </div> 

      <div className="card-body">
        <div className="card-price">{formatPrice(property.price)}</div>

        <div className="card-location">
          <span className="pin"></span>
          <span>{property.location}, {property.postcode}</span>
        </div>

        <div className="card-facts">
          <span>{property.bedrooms} bedrooms</span>
          <span> | {property.tenure}</span>
        </div>

        
        <div className="card-foot">
          <span className="added">
            Added {property.added.day} {property.added.month} {property.added.year}
          </span>
          <button className="link-btn" onClick={() => onOpen(property.id)}>
            View details 
          </button>
        </div>
      </div>
    </article>
  );
}

export { DRAG_TYPE };                                     // Exported so FavouritesPanel uses the same type
