// utils/images.js
// This file gives every property a list of image paths and a floor plan path.
// The actual image files live under: public/images/prop{N}/img{1..7}.jpg
// and public/images/prop{N}/floor1.jpg. Because they are in the `public` folder,

// Build the list of gallery images for a single property (img1..img7).
function galleryFor(propertyId) {
  const list = [];                                        // Empty array to collect the 7 image paths
  for (let i = 1; i <= 7; i++) {                          // Loop from 1 to 7 (we have 7 images per property)
    list.push(`/images/${propertyId}/img${i}.jpg`);       // Push the public URL for each image
  }
  return list;                                            // Return the completed list
}

// Build the floor plan path for a single property.
function floorFor(propertyId) {
  return `/images/${propertyId}/floor1.jpg`;              // Every property folder has one floor1.jpg
}

// Public helper: return { gallery, floorplan } for a given property id.
export function getPropertyImages(propertyId) {
  return {
    gallery: galleryFor(propertyId),                      // Array of 7 gallery images
    floorplan: floorFor(propertyId),                      // Single floor plan image
  };
}
