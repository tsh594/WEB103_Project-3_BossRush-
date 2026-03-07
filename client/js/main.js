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

// Adjusted to handle the new /assets/ folder path
const resolveImagePath = (image) => (image.startsWith('http') ? image : `/assets/${image}`);

const container = document.getElementById('boss-container');
const searchInput = document.getElementById('boss-search'); // New search input
const featuredBossBtn = document.getElementById('featured-boss-btn');

const renderError = () => {
  container.classList.remove('is-loading');
  container.setAttribute('aria-busy', 'false');
  container.innerHTML = '<p class="notice error">Unable to load bosses right now. Please refresh and try again.</p>';
};

const selectDailyFeaturedBoss = (bosses) => {
  if (!bosses.length) return undefined;

  const weightedPool = bosses.flatMap((boss) =>
    String(boss.difficulty || '').toLowerCase() === 'legendary' ? [boss, boss, boss] : [boss]
  );

  const dayKey = new Date().toLocaleDateString('en-CA');
  const hash = dayKey.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return weightedPool[hash % weightedPool.length];
};

const updateFeaturedBoss = (bosses) => {
  if (!featuredBossBtn || !bosses.length) return;

  const featuredBoss = selectDailyFeaturedBoss(bosses);
  if (!featuredBoss) return;

  const shortName = featuredBoss.name.split(',')[0];
  const label = shortName.length > 18 ? `${shortName.slice(0, 18)}...` : shortName;
  const labelSpan = featuredBossBtn.querySelector('.wide-text');

  featuredBossBtn.href = `/bosses/${featuredBoss.id}`;
  featuredBossBtn.setAttribute('title', `Featured Boss: ${featuredBoss.name}`);
  if (labelSpan) {
    labelSpan.textContent = `Featured: ${label}`;
  } else {
    featuredBossBtn.textContent = `Featured: ${label}`;
  }
};

const fetchFeaturedBoss = () => {
  fetch('/api/bosses')
    .then((res) => {
      if (!res.ok) throw new Error('Failed to fetch featured boss');
      return res.json();
    })
    .then(updateFeaturedBoss)
    .catch(() => {});
};

// Wrapped the fetch logic in a function so we can call it on search
const fetchBosses = (searchQuery = '') => {
  container.innerHTML = '<p class="notice">Loading archives...</p>';
  container.classList.add('is-loading');
  
  // Append the search query to the URL if it exists
  const url = searchQuery ? `/api/bosses?search=${encodeURIComponent(searchQuery)}` : '/api/bosses';

  fetch(url)
    .then((res) => {
      if (!res.ok) throw new Error('Failed to fetch boss list');
      return res.json();
    })
    .then((data) => {
      container.classList.remove('is-loading');
      container.setAttribute('aria-busy', 'false');

      if (data.length === 0) {
        container.innerHTML = '<p class="notice">No entities match your search parameters in the void.</p>';
        return;
      }

      container.innerHTML = data.map((boss) => `
          <article class="boss-card">
            <div class="card-img-wrapper">
              <img src="${resolveImagePath(boss.image)}" alt="${boss.name}">
            </div>
            <div class="card-content">
              <h3>${boss.title}</h3>
              <h2 class="${bossThemeClass(boss.name)}">${boss.name}</h2>
              <p>${boss.description}</p>
              <a href="/bosses/${boss.id}" class="lore-btn">View Lore</a>
            </div>
          </article>
        `).join('');
    })
    .catch(renderError);
};

// Initial load
fetchBosses();
fetchFeaturedBoss();

// Listen for typing in the search bar
searchInput.addEventListener('input', (e) => {
    const query = e.target.value;
    fetchBosses(query);
});
