const pool = require('./database');
const bosses = require('../../data');

const locations = [
    {
        id: 'limgrave',
        name: 'Limgrave Warcamp',
        region: 'The Lands Between',
        image: 'a_rot_goddess_with_golden_armor.png',
        description: 'A goddess of rot who has never known defeat. Her Waterfowl Dance is legendary. This location hosts coordinated training events and strategy briefings for high-risk encounters.'
    },
    {
        id: 'midgar',
        name: 'Midgar Reactor District',
        region: 'Gaia',
        image: 'a_silver-haired_swordsman_with_a_long_blade.jpg',
        description: 'He seeks to become a god by wounding the planet with the meteor. This location runs tactical events focused on raid preparation and survival planning.'
    },
    {
        id: 'hyrule',
        name: 'Hyrule Castle Perimeter',
        region: 'Hyrule',
        image: 'a_purple_misty_demon_king.jpg',
        description: 'A primal force of pure evil that has been trapped in Hyrule Castle for 100 years. This location organizes defensive events and guardian-counter drills.'
    },
    {
        id: 'redgrave',
        name: 'Red Grave Plaza',
        region: 'Red Grave City',
        image: 'a_blue-armored_samurai.jpg',
        description: "Dante's twin brother. He seeks more power and wields the Yamato katana. This location features advanced combat events and precision weapon workshops."
    },
    {
        id: 'koopa-ruins',
        name: 'Koopa Ruins Coliseum',
        region: 'Mushroom Kingdom',
        image: 'a_skeletal_dragon_king.jpg',
        description: 'The undead version of the King of Koopas. He breathes blue fire and throws bones. This location hosts endurance events and coordinated challenge runs.'
    }
];

const events = [
    {
        id: 'evt-limgrave-1',
        location_id: 'limgrave',
        name: 'Rune Farming Group Run',
        organizer: 'Roundtable Tacticians',
        start_at: '2026-03-20T18:00:00Z',
        description: 'Coordinated route to farm runes and upgrade gear quickly.'
    },
    {
        id: 'evt-limgrave-2',
        location_id: 'limgrave',
        name: 'Boss Mechanics Workshop',
        organizer: 'Grace Site Mentors',
        start_at: '2026-03-22T20:30:00Z',
        description: 'Learn dodge timing, spacing, and punish windows for late-game fights.'
    },
    {
        id: 'evt-midgar-1',
        location_id: 'midgar',
        name: 'Materia Build Clinic',
        organizer: 'Avalanche Labs',
        start_at: '2026-03-19T17:00:00Z',
        description: 'Hands-on build reviews for support, burst, and survival playstyles.'
    },
    {
        id: 'evt-hyrule-1',
        location_id: 'hyrule',
        name: 'Guardian Evasion Drills',
        organizer: 'Sheikah Scouts',
        start_at: '2026-03-24T16:00:00Z',
        description: 'Practice movement routes and beam counterplay in live simulations.'
    },
    {
        id: 'evt-redgrave-1',
        location_id: 'redgrave',
        name: 'Yamato Technique Exhibition',
        organizer: 'Order of Sparda',
        start_at: '2026-03-26T21:00:00Z',
        description: 'Showcase event covering advanced weapon flow and combo routing.'
    },
    {
        id: 'evt-koopa-1',
        location_id: 'koopa-ruins',
        name: 'Undead King Challenge Night',
        organizer: 'Shellbreak Collective',
        start_at: '2026-03-29T19:30:00Z',
        description: 'Practice high-pressure phases and group role coordination in a rotating gauntlet.'
    }
];

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

const createCommunityTables = async () => {
    const createTablesQuery = `
        DROP TABLE IF EXISTS events;
        DROP TABLE IF EXISTS locations;

        CREATE TABLE IF NOT EXISTS locations (
            id VARCHAR(255) PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            region VARCHAR(255) NOT NULL,
            image VARCHAR(255) NOT NULL,
            description TEXT NOT NULL
        );

        CREATE TABLE IF NOT EXISTS events (
            id VARCHAR(255) PRIMARY KEY,
            location_id VARCHAR(255) NOT NULL REFERENCES locations(id) ON DELETE CASCADE,
            name VARCHAR(255) NOT NULL,
            organizer VARCHAR(255) NOT NULL,
            start_at TIMESTAMPTZ NOT NULL,
            description TEXT NOT NULL
        );
    `;

    await pool.query(createTablesQuery);
    console.log('🎉 locations and events tables created successfully');
};

const seedBossesTable = async () => {
    try {
        await createBossesTable();
        await createCommunityTables();

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

                const insertLocationQuery = `
                    INSERT INTO locations (id, name, region, image, description)
                    VALUES ($1, $2, $3, $4, $5)
                `;

                for (const location of locations) {
                    const values = [
                        location.id,
                        location.name,
                        location.region,
                        location.image,
                        location.description
                    ];

                    await pool.query(insertLocationQuery, values);
                    console.log(`📍 ${location.name} location added successfully`);
                }

                const insertEventQuery = `
                    INSERT INTO events (id, location_id, name, organizer, start_at, description)
                    VALUES ($1, $2, $3, $4, $5, $6)
                `;

                for (const event of events) {
                    const values = [
                        event.id,
                        event.location_id,
                        event.name,
                        event.organizer,
                        event.start_at,
                        event.description
                    ];

                    await pool.query(insertEventQuery, values);
                    console.log(`🗓️ ${event.name} event added successfully`);
                }

                console.log('🚀 bosses, locations, and events tables seeded successfully');
    } catch (error) {
        console.error('⚠️ error seeding bosses table', error);
        process.exitCode = 1;
    } finally {
        await pool.end();
    }
};

seedBossesTable();
