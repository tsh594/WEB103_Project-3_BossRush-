import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllEvents } from '../services/eventsApi.js';
import { getAllLocations } from '../services/locationsApi.js';

const formatDateTime = (iso) => {
  const date = new Date(iso);
  return date.toLocaleString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit'
  });
};

const formatCountdown = (eventDate, now) => {
  const diffMs = eventDate.getTime() - now.getTime();
  const absMs = Math.abs(diffMs);
  const totalMinutes = Math.floor(absMs / (1000 * 60));
  const days = Math.floor(totalMinutes / (60 * 24));
  const hours = Math.floor((totalMinutes % (60 * 24)) / 60);
  const minutes = totalMinutes % 60;

  const parts = [];
  if (days) parts.push(`${days}d`);
  if (hours || days) parts.push(`${hours}h`);
  parts.push(`${minutes}m`);

  return diffMs >= 0 ? `Starts in ${parts.join(' ')}` : `Started ${parts.join(' ')} ago`;
};

function EventsPage() {
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timerId = window.setInterval(() => setNow(new Date()), 60 * 1000);
    return () => window.clearInterval(timerId);
  }, []);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const data = await getAllLocations();
        setLocations(data);
      } catch {
        setLocations([]);
      }
    };

    fetchLocations();
  }, []);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      setError('');

      try {
        const data = await getAllEvents(selectedLocation);
        setEvents(data);
      } catch (err) {
        setError(err.message || 'Unable to load events.');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [selectedLocation]);

  const locationNameById = useMemo(() => {
    const entries = locations.map((location) => [location.id, location.name]);
    return new Map(entries);
  }, [locations]);

  return (
    <main className="container location-page">
      <h1 className="page-title">All Community Events</h1>

      <div className="events-toolbar">
        <label htmlFor="location-filter">Filter by location:</label>
        <select
          id="location-filter"
          className="events-select"
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
        >
          <option value="">All Locations</option>
          {locations.map((location) => (
            <option key={location.id} value={location.id}>{location.name}</option>
          ))}
        </select>
        <Link to="/" className="back-btn">Back To Locations</Link>
      </div>

      {loading && <p className="status">Loading events...</p>}
      {!loading && error && <p className="status error">{error}</p>}

      {!loading && !error && events.length === 0 && (
        <p className="status">No events found for the current filter.</p>
      )}

      {!loading && !error && events.length > 0 && (
        <div className="events-list">
          {events.map((event) => {
            const eventDate = new Date(event.start_at);
            const hasPassed = eventDate.getTime() < now.getTime();

            return (
              <article key={event.id} className={`event-card ${hasPassed ? 'event-passed' : 'event-upcoming'}`}>
                <h3 className="event-name">{event.name}</h3>
                <p className="location-chip">Location: {locationNameById.get(event.location_id) || event.location_id}</p>
                <p className="event-meta"><strong>Organizer:</strong> {event.organizer}</p>
                <p className="event-meta"><strong>Starts:</strong> {formatDateTime(event.start_at)}</p>
                <p className={`countdown ${hasPassed ? 'countdown-passed' : 'countdown-upcoming'}`}>
                  {formatCountdown(eventDate, now)}
                </p>
                <p className="event-description">{event.description}</p>
              </article>
            );
          })}
        </div>
      )}
    </main>
  );
}

export default EventsPage;
