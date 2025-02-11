import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Map from "./Map"; // Import Map Component

const ActionButton = ({ symbol, onClick, color }) => (
  <button
    onClick={onClick}
    className={`w-6 h-6 flex items-center justify-center border-2 ${color} rounded-md text-sm font-bold hover:opacity-75`}
  >
    {symbol}
  </button>
);

const DraggableItem = ({ item, type, onDelete, onAdd, dayIndex }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type,
    item: { ...item, dayIndex },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`border-2 p-3 mb-3 rounded-lg shadow-lg bg-white relative transition-transform transform hover:scale-105 ${
        isDragging ? "opacity-50" : ""
      }`}
    >
      <div className="flex justify-between items-center mb-2">
        <ActionButton symbol="+" onClick={() => onAdd(dayIndex, type, item)} color="border-green-300 text-green-300" />
        <ActionButton symbol="X" onClick={() => onDelete(dayIndex, type, item)} color="border-red-200 text-red-200" />
      </div>
      <p
        className="font-bold text-blue-600 cursor-pointer hover:underline"
        onClick={() => window.open(item.google_link, "_blank")}
      >
        {item.name}
      </p>
      <p className="text-sm text-gray-500 italic">{item.description}</p>
      <p>💰 ${item.cost}</p>
      <p>⭐ {item.rating}</p>
    </div>
  );
};

const DroppableArea = ({ dayIndex, type, items, onDrop, onDelete, onAdd }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: type,
    drop: (item) => onDrop(dayIndex, type, item),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      className={`p-4 mb-4 rounded-lg border-2 ${
        isOver ? "bg-green-50" : "bg-gray-50"
      }`}
    >
      <h3 className="font-semibold text-gray-700 capitalize mb-2">{type}</h3>
      {Array.isArray(items) && items.map((item, index) => (
        <DraggableItem
          key={index}
          item={item}
          type={type}
          dayIndex={dayIndex}
          onDelete={onDelete}
          onAdd={onAdd}
        />
      ))}
    </div>
  );
};

export default function ItineraryEditor() {
  const location = useLocation();
  const { tripDetails } = location.state || {};
  const [itinerary, setItinerary] = useState(tripDetails?.itinerary || []);
  const [extraItems, setExtraItems] = useState({ attractions: [], restaurants: [], lodging: [] });
  const [showLogin, setShowLogin] = useState(false);
  const destination = tripDetails?.destination || "Paris";

  const fetchMoreItems = async (type) => {
    try {
      const response = await axios.post(`http://localhost:3000/search/more_${type}`, {
        destination,
        count: type === "lodging" ? 5 : 10,
      });
      setExtraItems((prev) => ({ ...prev, [type]: [...prev[type], ...response.data[type]] }));
    } catch (error) {
      console.error(`Error fetching more ${type}:`, error);
    }
  };

  const handleAddItem = (dayIndex, type, item) => {
    setItinerary((prev) => {
      const updatedItinerary = [...prev];
      updatedItinerary[dayIndex] = updatedItinerary[dayIndex] || { day: dayIndex + 1, attractions: [], restaurants: [], lodging: [] };
      updatedItinerary[dayIndex][type] = updatedItinerary[dayIndex][type] || [];
      updatedItinerary[dayIndex][type].push(item);
      return updatedItinerary;
    });
  };

  const handleDeleteItem = (dayIndex, type, item) => {
    setItinerary((prev) => {
      const updatedItinerary = [...prev];
      if (Array.isArray(updatedItinerary[dayIndex][type])) {
        updatedItinerary[dayIndex][type] = updatedItinerary[dayIndex][type].filter(
          (i) => i.name !== item.name
        );
      }
      return updatedItinerary;
    });
  };

  const handleSaveItinerary = () => {
    setShowLogin(true);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex bg-gradient-to-r from-pink-200 to-yellow-200 min-h-screen p-6">
        <div className="w-1/2 p-4">
          <h1 className="text-3xl font-bold text-pink-600 mb-4">Itinerary Editor</h1>
          {Array.isArray(itinerary) && itinerary.map((day, index) => (
            <div key={index} className="border-2 p-4 mb-4 rounded-lg shadow-md bg-white">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Day {day.day}</h2>
              {["attractions", "restaurants", "lodging"].map((type) => (
                <DroppableArea
                  key={type}
                  dayIndex={index}
                  type={type}
                  items={day[type] || []}
                  onDrop={handleAddItem}
                  onDelete={handleDeleteItem}
                  onAdd={handleAddItem}
                />
              ))}
            </div>
          ))}
          <button
            onClick={handleSaveItinerary}
            className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-700 transition font-extrabold"
          >
            Save Itinerary
          </button>

          {showLogin && (
            <div className="mt-4 p-4 border-2 rounded-lg bg-white shadow-md">
              <h3 className="text-lg font-bold text-gray-800 mb-2">Login Required</h3>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition">
                Login
              </button>
            </div>
          )}
        </div>

        <div className="w-1/2 p-4 border-l-2 border-gray-300 h-screen overflow-y-auto bg-white sticky top-0">
          <h2 className="text-2xl font-bold text-purple-400 mb-4">Explore More Options</h2>
          {["attractions", "restaurants", "lodging"].map((type) => (
            <button
              key={type}
              onClick={() => fetchMoreItems(type)}
              className="bg-orange-300 text-white px-4 py-2 rounded-lg shadow-md mb-3 w-full hover:bg-orange-400 transition font-extrabold"
            >
              + More {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}

          {Object.keys(extraItems).map((type) => (
            <div key={type} className="mt-4">
              <h3 className="text-lg font-bold text-gray-700 capitalize mb-2">{type}</h3>
              {Array.isArray(extraItems[type]) && extraItems[type].map((item, idx) => (
                <DraggableItem
                  key={idx}
                  item={item}
                  type={type}
                  onDelete={() => setExtraItems((prev) => ({
                    ...prev,
                    [type]: prev[type].filter((i) => i.name !== item.name)
                  }))}
                  onAdd={handleAddItem}
                />
              ))}
            </div>
          ))}

          <Map itinerary={itinerary} />
        </div>
      </div>
    </DndProvider>
  );
}
