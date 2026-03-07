const express = require('express');
const path = require('path');
const pool = require('./config/database');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// 1. Serve static files from 'client' folder
// This makes /css/style.css and /js/detail.js available
app.use(express.static(path.join(__dirname, '../client')));
app.use('/assets', express.static(path.join(__dirname, '../client/assets')));

/**
 * 📡 API ROUTES
 */
app.get('/api/bosses', async (req, res) => {
    try {
        const { search } = req.query;
        const searchTerm = typeof search === 'string' ? search.trim() : '';

        let queryText = 'SELECT * FROM bosses ORDER BY name ASC';
        let queryParams = [];

        if (searchTerm) {
            queryText = 'SELECT * FROM bosses WHERE name ILIKE $1 OR game ILIKE $1 OR title ILIKE $1 ORDER BY name ASC';
            queryParams = [`%${searchTerm}%`];
        }

        const result = await pool.query(queryText, queryParams);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Database error." });
    }
});

app.get('/api/bosses/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('SELECT * FROM bosses WHERE id = $1', [id]);
        
        if (result.rows.length > 0) {
            res.json(result.rows[0]);
        } else {
            res.status(404).json({ error: "Boss not found." });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Database error." });
    }
});

/**
 * 🌐 HTML ROUTES
 */
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client', 'index.html'));
});

// This route serves the detail page
app.get('/bosses/:id', (req, res) => {
    res.sendFile(path.join(__dirname, '../client', 'detail.html'));
});

// 404 Handler (MUST be last)
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, '../client', '404.html'));
});

app.listen(PORT, () => {
        console.log(`
    ---------------------------------------------------
    🚀 BOSSRUSH: NEON VOID IS LIVE (DATABASE CONNECTED)
    🔗 http://localhost:${PORT}
    ---------------------------------------------------
    `);
    
});