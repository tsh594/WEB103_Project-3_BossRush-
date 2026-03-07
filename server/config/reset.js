const pool = require('./database');
const bosses = require('../../data');

const createBossesTable = async () => {
    const createTableQuery = `
        DROP TABLE IF EXISTS bosses;

        CREATE TABLE IF NOT EXISTS bosses (
            id VARCHAR(255) PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            title VARCHAR(255) NOT NULL,
            game VARCHAR(255) NOT NULL,
            difficulty VARCHAR(50) NOT NULL,
            image VARCHAR(255) NOT NULL,
            description TEXT NOT NULL
        );
    `;

    await pool.query(createTableQuery);
    console.log('🎉 bosses table created successfully');
};

const seedBossesTable = async () => {
    try {
        await createBossesTable();

        const insertQuery = `
            INSERT INTO bosses (id, name, title, game, difficulty, image, description)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
        `;

        for (const boss of bosses) {
            const values = [
                boss.id,
                boss.name,
                boss.title,
                boss.game,
                boss.difficulty,
                boss.image,
                boss.description
            ];

            await pool.query(insertQuery, values);
            console.log(`✅ ${boss.name} added successfully`);
        }

        console.log('🚀 bosses table seeded successfully');
    } catch (error) {
        console.error('⚠️ error seeding bosses table', error);
        process.exitCode = 1;
    } finally {
        await pool.end();
    }
};

seedBossesTable();
