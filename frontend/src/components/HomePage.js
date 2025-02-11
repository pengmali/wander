import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { generateItinerary } from "../services/api";
import backgroundImage from "../assets/destinations/pexels-vincent-gerbouin-445991-1172524.jpg";

const travelStyles = [
  "Solo", "Hiking", "Family", "Business", "Budget",
  "Luxury", "Backpacking", "Romantic", "Adventure",
  "Cultural", "Food", "Relaxation", "Road"
];

export default function HomePage() {
  const [formData, setFormData] = useState({
    destination: "",
    budget: "",
    startDate: "",
    tripLength: "",
    preferences: [],
  });

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePreferenceToggle = (preference) => {
    setFormData((prev) => {
      const updatedPreferences = prev.preferences.includes(preference)
        ? prev.preferences.filter((p) => p !== preference)
        : [...prev.preferences, preference];
      return { ...prev, preferences: updatedPreferences };
    });
    setDropdownOpen(false); // Collapse dropdown after selection
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const preferences = formData.preferences.join(", ");
      const itinerary = await generateItinerary({ ...formData, preferences });
      navigate("/trip-details", { state: { tripDetails: itinerary } });
    } catch (error) {
      console.error("Error generating itinerary:", error);
    }
  };

  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen bg-cover bg-center flex justify-center items-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <form onSubmit={handleSubmit} className="bg-white bg-opacity-90 p-6 rounded shadow-md w-80">
        <h1 className="text-2xl font-bold text-center mb-4">Where Wonders Begin</h1>

        <input
          type="text"
          name="destination"
          value={formData.destination}
          onChange={handleChange}
          placeholder="Destination"
          className="w-full p-2 border rounded mb-4"
        />

        <input
          type="number"
          name="budget"
          value={formData.budget}
          onChange={handleChange}
          placeholder="Budget"
          className="w-full p-2 border rounded mb-4"
        />

        <input
          type="date"
          name="startDate"
          value={formData.startDate}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-4"
        />

        <input
          type="number"
          name="tripLength"
          value={formData.tripLength}
          onChange={handleChange}
          placeholder="Trip Length (days)"
          className="w-full p-2 border rounded mb-4"
        />

        <div className="relative mb-4">
          <div
            className="w-full p-2 border rounded cursor-pointer flex justify-between items-center"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            Preferences
            <span>{dropdownOpen ? "▲" : "▼"}</span>
          </div>
          {dropdownOpen && (
            <div className="absolute w-full border bg-white max-h-40 overflow-y-scroll mt-1 rounded shadow z-10">
              {travelStyles.map((style) => (
                <label key={style} className="flex items-center p-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.preferences.includes(style)}
                    onChange={() => handlePreferenceToggle(style)}
                    className="mr-2"
                  />
                  {style}
                </label>
              ))}
            </div>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
        >
          Plan Now
        </button>
      </form>
    </div>
  );
}
