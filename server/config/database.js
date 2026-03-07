// server/config/database.js
const { Pool } = require('pg');
require('dotenv').config();

const urlConfig = process.env.DATABASE_URL ? new URL(process.env.DATABASE_URL) : null;

const config = {
    user: process.env.PGUSER || (urlConfig ? decodeURIComponent(urlConfig.username) : undefined),
    password: process.env.PGPASSWORD || (urlConfig ? decodeURIComponent(urlConfig.password) : undefined),
    host: process.env.PGHOST || (urlConfig ? urlConfig.hostname : undefined),
    port: process.env.PGPORT || (urlConfig ? urlConfig.port || 5432 : undefined),
    database: process.env.PGDATABASE || (urlConfig ? urlConfig.pathname.replace(/^\//, '') : undefined),
    ssl: {
        rejectUnauthorized: false
    }
};

const pool = new Pool(config);

pool.on('connect', () => {
    console.log('⚡ NEON VOID DATABASE: Connection Established (Secure SSL)');
});

module.exports = pool;