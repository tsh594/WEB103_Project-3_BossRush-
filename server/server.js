const express = require('express');
const path = require('path');
const cors = require('cors');
const pool = require('./config/database');
const eventsRouter = require('./routes/events');
const locationsRouter = require('./routes/locations');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const clientDistPath = path.join(__dirname, '../client/dist');
const clientAssetsPath = path.join(__dirname, '../client/assets');

app.use(cors());
app.use(express.json());

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

app.use('/api/events', eventsRouter);
app.use('/api/locations', locationsRouter);

app.use('/api', (req, res) => {
    res.status(404).json({ error: 'API route not found' });
});

app.use('/assets', express.static(clientAssetsPath));
app.use(express.static(clientDistPath));

app.get(/^(?!\/api).*/, (req, res) => {
    res.sendFile(path.join(clientDistPath, 'index.html'));
});

// 404 Handler (MUST be last)
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
        console.log(`
    ---------------------------------------------------
    🚀 BOSSRUSH: NEON VOID IS LIVE (DATABASE CONNECTED)
    🔗 http://localhost:${PORT}
    ---------------------------------------------------
    `);
    
});
