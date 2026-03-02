fetch('/api/bosses')
    .then(res => res.json())
    .then(data => {
        const container = document.getElementById('boss-container');
        container.innerHTML = data.map(boss => `
            <article class="boss-card">
                <div class="card-img-wrapper">
                    <img src="${boss.image.startsWith('http') ? boss.image : '/' + boss.image}" alt="${boss.name}">
                </div>
                <div class="card-content">
                    <h3>${boss.title}</h3>
                    <h2 class="
                        ${boss.name === 'Calamity Ganon' ? 'calamity-ganon' : ''}
                        ${boss.name === 'Sephiroth' ? 'sephiroth' : ''}
                        ${boss.name === 'Malenia, Blade of Miquella' ? 'malenia' : ''}
                        ${boss.name === 'Vergil' ? 'vergil' : ''}
                        ${boss.name === 'Dry Bowser' ? 'dry-bowser' : ''}
                    ">${boss.name}</h2>
                    <p>${boss.description}</p>
                    <a href="/bosses/${boss.id}" role="button" class="lore-btn">VIEW LORE</a>
                </div>
            </article>
        `).join('');
    });