import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import LocationDetailsPage from './pages/LocationDetailsPage.jsx';
import EventsPage from './pages/EventsPage.jsx';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/locations/:id" element={<LocationDetailsPage />} />
      <Route path="/events" element={<EventsPage />} />
    </Routes>
  );
}

export default App;
