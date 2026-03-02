const bossId = window.location.pathname.split('/').pop();

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

const container = document.getElementById('lore-content');
container.innerHTML = '<p class="notice">Loading boss profile...</p>';

const renderError = () => {
  container.setAttribute('aria-busy', 'false');
  container.innerHTML = '<p class="notice error">Unable to load this boss profile right now. Please return and try again.</p>';
};

fetch(`/api/bosses/${bossId}`)
  .then((res) => {
    if (!res.ok) {
      throw new Error('Failed to fetch boss profile');
    }

    return res.json();
  })
  .then((boss) => {
    container.setAttribute('aria-busy', 'false');

    container.innerHTML = `
      <div class="lore-grid">
        <div class="portrait-frame">
          <img src="${resolveImagePath(boss.image)}" alt="${boss.name}">
        </div>
        <div>
          <span class="difficulty-tag ${boss.difficulty.toLowerCase().replace(/[^a-z0-9]/g, '-')}">${boss.difficulty}</span>
          <p class="boss-title">${boss.title}</p>
          <h1 class="boss-name ${bossThemeClass(boss.name)}">${boss.name}</h1>
          <p class="origin-text">Origin: ${boss.game}</p>
          <hr class="divider">
          <p class="boss-description">${boss.description}</p>
          <p class="lore-quote">"Few have faced this entity and lived to tell the tale."</p>
          <div class="detail-actions">
            <a href="/" class="back-btn">Return</a>
          </div>
        </div>
      </div>
    `;
  })
  .catch(renderError);
