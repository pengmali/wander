import React, { useEffect, useRef } from "react";

export default function Map({ itinerary }) {
  const mapRef = useRef(null);

  useEffect(() => {
    if (window.google && itinerary.length) {
      const map = new window.google.maps.Map(mapRef.current, {
        center: { lat: 48.8566, lng: 2.3522 }, // Default to Paris
        zoom: 12,
      });

      itinerary.forEach((day) => {
        const places = [
          ...day.attractions,
          ...day.restaurants,
          day.lodging,
        ].filter(Boolean); // Filter out undefined/null

        places.forEach((place) => {
          if (place.latitude && place.longitude) {
            new window.google.maps.Marker({
              position: { lat: place.latitude, lng: place.longitude },
              map,
              title: place.name,
            });
          }
        });
      });
    }
  }, [itinerary]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold text-center mb-4">Trip Map</h2>
      <div
        ref={mapRef}
        style={{ width: "100%", height: "400px", borderRadius: "8px" }}
        className="shadow-md"
      ></div>
    </div>
  );
}
