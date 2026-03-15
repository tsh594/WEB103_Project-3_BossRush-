import React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllLocations } from '../services/locationsApi.js';

const bossThemeClass = (name) => {
  const map = {
    'Calamity Ganon': 'calamity-ganon',
    Sephiroth: 'sephiroth',
    'Malenia, Blade of Miquella': 'malenia',
    Vergil: 'vergil',
    'Dry Bowser': 'dry-bowser'
  };

  return map[name] || '';
};

const bossLoreByLocationId = {
  limgrave: {
    name: 'Malenia, Blade of Miquella',
    title: 'Goddess of Rot',
    game: 'Elden Ring',
    description: 'A goddess of rot who has never known defeat. Her Waterfowl Dance is legendary.'
  },
  midgar: {
    name: 'Sephiroth',
    title: 'The One-Winged Angel',
    game: 'Final Fantasy VII',
    description: 'He seeks to become a god by wounding the planet with the meteor.'
  },
  hyrule: {
    name: 'Calamity Ganon',
    title: 'Primal Force of Evil',
    game: 'Zelda: Breath of the Wild',
    description: 'A primal force of pure evil that has been trapped in Hyrule Castle for 100 years.'
  },
  redgrave: {
    name: 'Vergil',
    title: 'The Alpha and Omega',
    game: 'Devil May Cry 5',
    description: "Dante's twin brother. He seeks more power and wields the Yamato katana."
  },
  'koopa-ruins': {
    name: 'Dry Bowser',
    title: 'Undead King',
    game: 'Super Mario',
    description: 'The undead version of the King of Koopas. He breathes blue fire and throws bones.'
  }
};

const getLoreForLocation = (location) => bossLoreByLocationId[location.id] || {
  name: location.name,
  title: location.region,
  game: location.region,
  description: location.description
};

const selectDailyFeaturedLocation = (locations) => {
  if (!locations.length) return undefined;

  const dayKey = new Date().toLocaleDateString('en-CA');
  const hash = dayKey.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return locations[hash % locations.length];
};

function HomePage() {
  const heroTextSpacing = {
    letterSpacing: '0.05em',
    display: 'inline-flex',
    alignItems: 'center',
    columnGap: '0.26em'
  };

  const renderSpacedWords = (text) => (
    text.split(' ').map((word, index) => (
      <span key={`${word}-${index}`}>{word}</span>
    ))
  );

  const [locations, setLocations] = useState([]);
  const [featuredLocation, setFeaturedLocation] = useState(null);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const data = await getAllLocations();
        setLocations(data);
        setFeaturedLocation(selectDailyFeaturedLocation(data));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLocations();
  }, []);

  const filteredLocations = locations.filter((location) => {
    const lore = getLoreForLocation(location);
    const value = query.trim().toLowerCase();
    if (!value) return true;
    return (
      location.name.toLowerCase().includes(value) ||
      location.region.toLowerCase().includes(value) ||
      location.description.toLowerCase().includes(value) ||
      lore.name.toLowerCase().includes(value) ||
      lore.title.toLowerCase().includes(value) ||
      lore.game.toLowerCase().includes(value) ||
      lore.description.toLowerCase().includes(value)
    );
  });

  return (
    <>
      <a className="skip-link" href="#location-container">Skip to location list</a>

      <header className="hero">
        <div className="hero-text-box">
          <a id="enter-void-btn" href="#location-container" className="hero-btn hero-btn-primary hero-btn-top">
            <span className="wide-text" style={heroTextSpacing}>{renderSpacedWords('Enter The Void')}</span>
          </a>

          <div className="hero-actions hero-actions-lower">
            <Link id="featured-boss-btn" to={featuredLocation ? `/locations/${featuredLocation.id}` : '/locations/limgrave'} className="hero-btn hero-btn-secondary">
              <span className="wide-text">
                <span style={heroTextSpacing}>{renderSpacedWords(featuredLocation ? `Featured Location: ${featuredLocation.name}` : 'Featured Location')}</span>
              </span>
            </Link>
            <Link to="/events" className="hero-btn hero-btn-secondary">
              <span className="wide-text" style={heroTextSpacing}>{renderSpacedWords('Event Lore')}</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="container">
        <h1 className="page-title">Boss Rush Community Locations</h1>

        <div className="search-wrapper">
          <input
            type="text"
            className="neon-search"
            placeholder="Search by name, title, or game..."
            aria-label="Search locations"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <section id="location-container" className={`bestiary-grid ${loading ? 'is-loading' : ''}`} aria-live="polite" aria-busy={loading}>
          {loading && <p className="notice">Loading archives...</p>}
          {!loading && error && <p className="notice error">{error}</p>}
          {!loading && !error && filteredLocations.length === 0 && (
            <p className="notice">No locations match your search in the community archives.</p>
          )}

          {!loading && !error && filteredLocations.map((location) => {
            const lore = getLoreForLocation(location);
            return (
              <article key={location.id} className="boss-card">
                <div className="card-img-wrapper">
                  <img src={`/assets/${location.image}`} alt={lore.name} />
                </div>
                <div className="card-content">
                  <h3>{lore.title}</h3>
                  <h2 className={bossThemeClass(lore.name)}>{lore.name}</h2>
                  <p>{lore.description}</p>
                  <div className="card-footer">
                    <p className="location-chip">Location: {location.name}</p>
                    <Link to={`/locations/${location.id}`} className="lore-btn">View Lore</Link>
                  </div>
                </div>
              </article>
            );
          })}
        </section>
      </main>
    </>
  );
}

export default HomePage;
