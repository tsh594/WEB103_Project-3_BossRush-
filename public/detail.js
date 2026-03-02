const bossId = window.location.pathname.split('/').pop();

fetch(`/api/bosses/${bossId}`)
    .then(res => res.json())
    .then(boss => {
        const container = document.getElementById('lore-content');
        container.innerHTML = `
            <div class="lore-grid">
                <div class="portrait-frame">
                    <img src="${boss.image.startsWith('http') ? boss.image : '/' + boss.image}" alt="${boss.name}">
                </div>
                <div>
                    <span class="difficulty-tag ${boss.difficulty.toLowerCase().replace(/[^a-z0-9]/g, '-')}">${boss.difficulty}</span>
                    <p style="margin:0; opacity: 0.6;">${boss.title}</p>
                    <h1 class="boss-name ${boss.name === 'Calamity Ganon' ? 'calamity-ganon' : ''}
                        ${boss.name === 'Sephiroth' ? 'sephiroth' : ''}
                        ${boss.name === 'Malenia, Blade of Miquella' ? 'malenia' : ''}
                        ${boss.name === 'Vergil' ? 'vergil' : ''}
                        ${boss.name === 'Dry Bowser' ? 'dry-bowser' : ''}
                    ">${boss.name}</h1>
                    <p class="origin-text">ORIGIN: ${boss.game}</p>
                    <hr style="border-color: #222;">
                    <p style="font-size: 1.2rem; opacity: 0.8;">${boss.description}</p>
                    <p class="lore-quote">
                        "Few have faced this entity and lived to tell the tale."
                    </p>
                        <div style="margin-top: 2.2rem;">
                            <a href="/" role="button" class="back-btn">RETURN</a>
                        </div>
                </div>
            </div>
        `;
    });