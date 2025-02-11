import React from "react";
import londonImg from "../assets/destinations/london.jpg";
import parisImg from "../assets/destinations/paris.jpg";
import tahitiImg from "../assets/destinations/tahiti.jpg";
import tokyoImg from "../assets/destinations/tokyo.jpg";

// 🔹 Map destination names to their corresponding image files
const destinationImages = {
  London: londonImg,
  Paris: parisImg,
  Tahiti: tahitiImg,
  Tokyo: tokyoImg,
};

const DestinationCard = ({ destination }) => {
  return (
    <div className="p-4 border rounded-lg shadow-md bg-white">
      {/* Destination Image */}
      <img
        src={destinationImages[destination] || "https://via.placeholder.com/300"}
        alt={destination}
        className="w-full h-48 object-cover rounded-lg"
      />
      
      {/* Destination Title */}
      <h2 className="mt-3 text-xl font-bold text-center">{destination}</h2>
    </div>
  );
};

export default DestinationCard;