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

const resolveImagePath = (image) => (image.startsWith('http') ? image : `/${image}`);

const container = document.getElementById('boss-container');
container.innerHTML = '<p class="notice">Loading bosses...</p>';

const renderError = () => {
  container.classList.remove('is-loading');
  container.setAttribute('aria-busy', 'false');
  container.innerHTML = '<p class="notice error">Unable to load bosses right now. Please refresh and try again.</p>';
};

fetch('/api/bosses')
  .then((res) => {
    if (!res.ok) {
      throw new Error('Failed to fetch boss list');
    }

    return res.json();
  })
  .then((data) => {
    container.classList.remove('is-loading');
    container.setAttribute('aria-busy', 'false');

    container.innerHTML = data
      .map(
        (boss) => `
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
        `
      )
      .join('');
  })
  .catch(renderError);
