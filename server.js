const express = require('express');
const path = require('path');
const bosses = require('./data.js'); // Imports your updated boss list

const app = express();
const PORT = 3000;

/**
 * 📂 STATIC FILES
 * This line is the most important for your images! 
 * It tells Express that any file inside the 'public' folder 
 * (like BossRush.jpg or your boss portraits) can be accessed by the browser.
 */
app.use(express.static(path.join(__dirname, 'public')));

/**
 * 📡 API ROUTES
 * These send the "raw data" to your JavaScript (main.js and detail.js).
 */

// Get all bosses for the Home Page
app.get('/api/bosses', (req, res) => {
    res.json(bosses);
});

// Get a single boss by their ID (e.g., /api/bosses/malenia)
app.get('/api/bosses/:id', (req, res) => {
    const boss = bosses.find(b => b.id === req.params.id);
    if (boss) {
        res.json(boss);
    } else {
        res.status(404).json({ error: "Legendary foe not found in the archives." });
    }
});

/**
 * 🌐 HTML ROUTES
 * These tell the server which HTML file to show when you type a URL.
 */

// Home Page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Detail Page (Unique endpoint for each boss)
app.get('/bosses/:id', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'detail.html'));
});

/**
 * ⚠️ 404 ERROR PAGE
 * If a user types a wrong URL, we send them to your custom error page.
 */
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`
    ---------------------------------------------------
    🚀 BOSSRUSH: NEON VOID IS LIVE
    🔗 http://localhost:${PORT}
    ---------------------------------------------------
    `);
});
