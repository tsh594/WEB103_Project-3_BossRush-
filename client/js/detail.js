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

const resolveImagePath = (image) => (image.startsWith('http') ? image : `/assets/${image}`);

const container = document.getElementById('lore-content');
container.innerHTML = '<p class="notice">Loading boss profile...</p>';

const handleGoBack = () => {
  if (window.history.length > 1) {
    window.history.back();
    return;
  }

  window.location.href = '/';
};

const renderError = (status) => {
  const isNotFound = status === 404;
  const message = isNotFound
    ? 'That boss does not exist in the archives.'
    : 'Unable to load this boss profile right now. Please return and try again.';

  container.setAttribute('aria-busy', 'false');
  container.innerHTML = `
    <div class="notice error detail-error">
      <p class="detail-error-kicker">Archive Error 404</p>
      <h2 class="detail-error-title">Boss Entry Not Found</h2>
      <p class="detail-error-message">${message}</p>
      <div class="detail-error-actions">
        <a href="/" class="notice-action-btn notice-action-primary">Return to Bestiary</a>
        <button type="button" id="go-back-btn" class="notice-action-btn notice-action-secondary">Go Back</button>
      </div>
    </div>
  `;

  const goBackBtn = document.getElementById('go-back-btn');
  if (goBackBtn) {
    goBackBtn.addEventListener('click', handleGoBack);
  }
};

fetch(`/api/bosses/${bossId}`)
  .then((res) => {
    if (!res.ok) {
      throw new Error(String(res.status));
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
  .catch((error) => {
    const status = Number(error.message);
    renderError(Number.isNaN(status) ? undefined : status);
  });
