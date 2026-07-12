// components/PropertyDetail.jsx

import { useState } from "react";
import { getPropertyImages } from "../utils/images.js";
import { formatPrice } from "../utils/search.js";

// Receives property data and functions from the parent component.
export default function PropertyDetail({ property, onBack, isFavourite, onToggleFavourite }) {
  const { gallery, floorplan } = getPropertyImages(property.id); // get all images and floor plan selected property
  const [mainIndex, setMainIndex] = useState(0);    // store which images as the main image     
  const [tab, setTab] = useState("description");    // store which tab is currently slected      
  const query = encodeURIComponent(`${property.location}, ${property.postcode}, UK`); // create google map URL and encodeURIComponent makes the address safe to use inside the URL
  const mapUrl = `https://www.google.com/maps?q=${query}&output=embed`;

  return (
    <section className="detail-page">
      <button className="btn btn-ghost back-btn" onClick={onBack}>← Back to results</button>

      {/* ----- Gallery ----- */}
      <div className="gallery">
        <div className="gallery-main">
          <img src={gallery[mainIndex]} alt={`${property.location} photo ${mainIndex + 1}`} />
          <span className="type-badge">{property.type}</span>
        </div>
        <div className="gallery-thumbs">   {/* Shows small thumbnail images */}
          
          {gallery.map((src, i) => (
            <button
              key={src}
              type="button"
              className={"thumb " + (i === mainIndex ? "active" : "")}
              onClick={() => setMainIndex(i)}  // change main images when thumbnali is clicked            
              aria-label={`Show photo ${i + 1}`} 
            >
              <img src={src} alt="" />
            </button>
          ))}
        </div>
      </div>

      {/* ----- Header (price + address + heart) ----- */}
      <div className="detail-head">
        <div>
          <h2 className="detail-price">{formatPrice(property.price)}</h2>
          <p className="detail-location">
            📍 {property.location}, {property.postcode}
          </p>
        </div>
       
        <button
          className={"heart-btn big " + (isFavourite ? "is-fav" : "")}
          onClick={() => onToggleFavourite(property.id)}   // Adds or removes property from favourites
          aria-label="Toggle favourite"
        >
          {isFavourite ? "♥" : "♡"}
        </button>
      </div>

      {/* ----- Key facts card ----- */}
      <div className="facts-card">
        <div><strong>Type</strong><span>{property.type}</span></div>
        <div><strong>Bedrooms</strong><span>{property.bedrooms}</span></div>
        <div><strong>Tenure</strong><span>{property.tenure}</span></div>
        <div><strong>Added</strong><span>{property.added.day} {property.added.month} {property.added.year}</span></div>
      </div>

      {/* ----- Tabs ----- */}
      <div className="tabs">
        <button className={tab === "description" ? "tab active" : "tab"} onClick={() => setTab("description")}>Description</button>
        <button className={tab === "floor" ? "tab active" : "tab"} onClick={() => setTab("floor")}>Floor plan</button>
        <button className={tab === "map" ? "tab active" : "tab"} onClick={() => setTab("map")}>Map</button>
      </div>

  
      <div className="tab-body">
        {tab === "description" && (
          <p className="tab-desc">{property.description}</p>
        )}
        {tab === "floor" && (
          <img className="floorplan-img" src={floorplan} alt="Floor plan" />
        )}
        {tab === "map" && (
          <iframe
            title="Property location"
            src={mapUrl}
            className="map-frame"
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        )}
      </div>
    </section>
  );
}