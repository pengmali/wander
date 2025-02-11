import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function TripDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const { tripDetails } = location.state || {};

  if (!tripDetails || !tripDetails.itinerary) {
    return <p className="text-center text-gray-500 mt-10">No trip details available.</p>;
  }

  const handleEditClick = () => {
    navigate("/itinerary-editor", { state: { tripDetails } });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-6">
      <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">Trip Itinerary</h1>

      {tripDetails.itinerary.map((day, index) => (
        <div key={index} className="mb-10 border-b pb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Day {day.day}</h2>

          <section className="mb-6">
            <h3 className="text-xl font-semibold text-blue-500 mb-2">Attractions:</h3>
            <ul className="space-y-4">
              {day.attractions.map((attraction, i) => (
                <li key={i} className="p-4 bg-gray-50 rounded-lg shadow">
                  <a href={attraction.google_link} target="_blank" rel="noopener noreferrer" className="text-lg font-bold text-blue-600 hover:underline">
                    {attraction.name}
                  </a>
                  <p className="text-gray-700 mt-1">{attraction.description}</p>
                  <div className="flex justify-between mt-2">
                    <p className="text-sm text-gray-600">💰 Cost: ${attraction.cost}</p>
                    <p className="text-sm text-gray-600">⭐ Rating: {attraction.rating}</p>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <section className="mb-6">
            <h3 className="text-xl font-semibold text-blue-500 mb-2">Restaurants:</h3>
            <ul className="space-y-4">
              {day.restaurants.map((restaurant, i) => (
                <li key={i} className="p-4 bg-gray-50 rounded-lg shadow">
                  <a href={restaurant.google_link} target="_blank" rel="noopener noreferrer" className="text-lg font-bold text-blue-600 hover:underline">
                    {restaurant.name}
                  </a>
                  <p className="text-gray-700 mt-1">{restaurant.description}</p>
                  <div className="flex justify-between mt-2">
                    <p className="text-sm text-gray-600">💰 Cost: ${restaurant.cost}</p>
                    <p className="text-sm text-gray-600">⭐ Rating: {restaurant.rating}</p>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-blue-500 mb-2">Lodging:</h3>
            <div className="p-4 bg-gray-50 rounded-lg shadow">
              <a href={day.lodging.google_link} target="_blank" rel="noopener noreferrer" className="text-lg font-bold text-blue-600 hover:underline">
                {day.lodging.name}
              </a>
              <p className="text-gray-700 mt-1">{day.lodging.description}</p>
              <div className="flex justify-between mt-2">
                <p className="text-sm text-gray-600">💰 Cost: ${day.lodging.cost}</p>
                <p className="text-sm text-gray-600">⭐ Rating: {day.lodging.rating}</p>
              </div>
            </div>
          </section>
        </div>
      ))}

      <div className="flex justify-center mt-8">
        <button
          onClick={handleEditClick}
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-full shadow-lg transition duration-300"
        >
          ✏️ Edit Itinerary
        </button>
      </div>
    </div>
  );
}
