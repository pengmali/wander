import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import TripList from './components/TripList';
import TripDetails from './components/TripDetails';
import ItineraryEditor from './components/ItineraryEditor';
import Auth from './components/Auth';
import Map from './components/Map';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/trips" element={<TripList />} />
        <Route path="/trip-details" element={<TripDetails />} />
        <Route path="/itinerary-editor" element={<ItineraryEditor />} />
        <Route path="/login" element={<Auth />} /> 
        <Route path="/map" element={<Map />} />
      </Routes>
    </Router>
  );
}

export default App;
