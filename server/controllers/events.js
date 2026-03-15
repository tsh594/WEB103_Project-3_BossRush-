const pool = require('../config/database');

const getAllEvents = async (req, res) => {
  try {
    const { locationId } = req.query;

    const query = locationId
      ? {
          text: 'SELECT * FROM events WHERE location_id = $1 ORDER BY start_at ASC',
          values: [locationId]
        }
      : {
          text: 'SELECT * FROM events ORDER BY start_at ASC',
          values: []
        };

    const result = await pool.query(query);
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getEventsByLocation = async (req, res) => {
  try {
    const { id } = req.params;

    const locationResult = await pool.query('SELECT * FROM locations WHERE id = $1', [id]);
    if (!locationResult.rows.length) {
      return res.status(404).json({ error: 'Location not found' });
    }

    const eventsResult = await pool.query(
      'SELECT * FROM events WHERE location_id = $1 ORDER BY start_at ASC',
      [id]
    );

    return res.status(200).json({
      location: locationResult.rows[0],
      events: eventsResult.rows
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllEvents,
  getEventsByLocation
};
