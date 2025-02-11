import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function TripList() {
  const [trips, setTrips] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch saved trips from the backend
    const fetchTrips = async () => {
      try {
        const response = await axios.get("http://localhost:3000/users/1/itineraries");
        setTrips(response.data);
      } catch (error) {
        console.error("Error fetching trips:", error);
      }
    };

    fetchTrips();
  }, []);

  const handleTripClick = (trip) => {
    navigate("/trip-details", { state: { tripDetails: trip, itinerary: trip.itinerary } });
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Saved Trips</h1>

      {trips.length === 0 ? (
        <p className="text-center">No saved trips found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {trips.map((trip) => (
            <div
              key={trip.id}
              className="border rounded-lg p-4 shadow-md cursor-pointer hover:bg-gray-100"
              onClick={() => handleTripClick(trip)}
            >
              <h2 className="text-xl font-semibold">{trip.name}</h2>
              <p>Destination: {trip.destination}</p>
              <p>Start Date: {trip.start_date}</p>
              <p>Budget: ${trip.budget}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
