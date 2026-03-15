import React, { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getLocationEvents } from '../services/locationsApi.js';

const bossLoreByLocationId = {
  limgrave: {
    name: 'Malenia, Blade of Miquella',
    title: 'Goddess of Rot',
    game: 'Elden Ring',
    difficulty: 'Insane',
    description: 'A goddess of rot who has never known defeat. Her Waterfowl Dance is legendary.'
  },
  midgar: {
    name: 'Sephiroth',
    title: 'The One-Winged Angel',
    game: 'Final Fantasy VII',
    difficulty: 'Hard',
    description: 'He seeks to become a god by wounding the planet with the meteor.'
  },
  hyrule: {
    name: 'Calamity Ganon',
    title: 'Primal Force of Evil',
    game: 'Zelda: Breath of the Wild',
    difficulty: 'Legendary',
    description: 'A primal force of pure evil that has been trapped in Hyrule Castle for 100 years.'
  },
  redgrave: {
    name: 'Vergil',
    title: 'The Alpha and Omega',
    game: 'Devil May Cry 5',
    difficulty: 'Legendary',
    description: "Dante's twin brother. He seeks more power and wields the Yamato katana."
  },
  'koopa-ruins': {
    name: 'Dry Bowser',
    title: 'Undead King',
    game: 'Super Mario',
    difficulty: 'Hard',
    description: 'The undead version of the King of Koopas. He breathes blue fire and throws bones.'
  }
};

const getLoreForLocation = (locationId, fallback = {}) => bossLoreByLocationId[locationId] || {
  name: fallback.name || 'Unknown Boss',
  title: fallback.region || 'Unknown Title',
  game: fallback.region || 'Unknown Game',
  difficulty: 'Medium',
  description: fallback.description || 'No description available.'
};

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

function LocationDetailsPage() {
  const { id } = useParams();
  const [location, setLocation] = useState(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const lore = getLoreForLocation(location?.id, location || {});

  useEffect(() => {
    const fetchLocationEvents = async () => {
      setLoading(true);
      setError('');

      try {
        const data = await getLocationEvents(id);
        setLocation(data.location);
        setEvents(data.events || []);
      } catch (err) {
        setError(err.message || 'Unable to load this location right now.');
      } finally {
        setLoading(false);
      }
    };

    fetchLocationEvents();
  }, [id]);

  const sortedEvents = useMemo(
    () => [...events].sort((a, b) => new Date(a.start_at) - new Date(b.start_at)),
    [events]
  );

  if (loading) {
    return (
      <main className="container location-page">
        <p className="status">Loading location and events...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="container location-page">
        <p className="status error">{error}</p>
        <Link to="/" className="back-btn">Return</Link>
      </main>
    );
  }

  return (
    <>
      <header className="detail-hero-banner">
        <img
          className="detail-hero-img"
          src={`/assets/${location?.image}`}
          alt={location?.name}
        />
      </header>

      <main className="container">
        <section className="detail-panel">
          <div className="lore-grid">
            <div className="portrait-frame">
              <img
                src={`/assets/${location?.image}`}
                alt={location?.name}
              />
            </div>

            <div>
              <span className={`difficulty-tag ${String(lore.difficulty || 'medium').toLowerCase()}`}>{lore.difficulty}</span>
              <p className="boss-title">{lore.title}</p>
              <h1 className="boss-name">{lore.name}</h1>
              <p className="origin-text">Origin: {lore.game}</p>
              <hr className="divider" />
              <p className="boss-description">{lore.description}</p>
              <p className="lore-quote">Location: {location?.name} ({location?.region})</p>

              <div className="detail-actions">
                <Link to="/" className="back-btn">Return</Link>
              </div>
            </div>
          </div>

          <hr className="divider" />

          <h2 className="events-title">Upcoming Events</h2>
          {sortedEvents.length === 0 ? (
            <p className="status">No events are currently scheduled for this location.</p>
          ) : (
            <div className="events-list">
              {sortedEvents.map((event) => (
                <article key={event.id} className="event-card event-upcoming">
                  <h3 className="event-name">{event.name}</h3>
                  <p className="event-meta"><strong>Organizer:</strong> {event.organizer}</p>
                  <p className="event-meta"><strong>Starts:</strong> {formatDateTime(event.start_at)}</p>
                  <p className="event-description">{event.description}</p>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>
    </>
  );
}

export default LocationDetailsPage;
