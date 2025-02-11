import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { generateItinerary } from "../services/api";
import londonImg from "../assets/destinations/London.jpg";
import parisImg from "../assets/destinations/Paris.jpg";
import tahitiImg from "../assets/destinations/Tahiti.jpg";
import tokyoImg from "../assets/destinations/Tokyo.jpg";

const destinationImages = {
  Paris: parisImg,
  London: londonImg,
  Tahiti: tahitiImg,
  Tokyo: tokyoImg,
};

export default function HomePage() {
  const [formData, setFormData] = useState({
    destination: "",
    budget: "",
    tripLength: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageClick = (destination) => {
    setFormData((prev) => ({ ...prev, destination }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const itinerary = await generateItinerary(formData);
      navigate("/trip-details", { state: { tripDetails: itinerary } });
    } catch (error) {
      console.error("Error generating itinerary:", error);
    }
  };

  const navigate = useNavigate();

  return (
    <div className="p-6 flex flex-col items-center bg-white min-h-screen">
      {/* Navigation Bar */}
      <nav className="w-full flex justify-between items-center px-6 py-4 shadow-md bg-gray-50">
        <div className="h-6 w-24 bg-gray-300 rounded"></div>
        <div className="flex space-x-4">
          {Array(4).fill("Home").map((text, idx) => (
            <a key={idx} href="#" className="text-blue-600 font-semibold">{text}</a>
          ))}
        </div>
        <div className="flex space-x-2">
          <div className="h-4 w-8 bg-gray-300 rounded"></div>
          <div className="h-4 w-8 bg-gray-300 rounded"></div>
        </div>
      </nav>

      <div className="flex justify-center items-center mt-8">
        <div className="bg-yellow-100 p-6 rounded shadow-md text-2xl font-bold text-gray-800">
          Where Wonders Begin
        </div>
      </div>

      <div className="flex mt-8 w-full justify-center items-start space-x-8">
        <form onSubmit={handleSubmit} className="space-y-4 max-w-xs">
          <div>
            <label className="block font-bold mb-1">Budget</label>
            <input
              type="number"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              className="w-full p-2 border rounded bg-gray-200"
            />
          </div>
          <div>
            <label className="block font-bold mb-1">Destinations</label>
            <input
              type="text"
              name="destination"
              value={formData.destination}
              onChange={handleChange}
              className="w-full p-2 border rounded bg-gray-200"
            />
          </div>
          <div>
            <label className="block font-bold mb-1">Trip Length</label>
            <input
              type="number"
              name="tripLength"
              value={formData.tripLength}
              onChange={handleChange}
              className="w-full p-2 border rounded border-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded shadow-md hover:bg-green-600 transition"
          >
            Plan now
          </button>
        </form>

        <div className="grid grid-cols-2 gap-4">
          {Object.entries(destinationImages).map(([destination, imgSrc]) => (
            <div
              key={destination}
              onClick={() => handleImageClick(destination)}
              className="cursor-pointer border rounded-lg overflow-hidden shadow-md hover:shadow-lg"
            >
              <img src={imgSrc} alt={destination} className="w-full h-32 object-cover" />
              <p className="text-center p-1 bg-gray-300 text-white font-semibold">{destination}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}