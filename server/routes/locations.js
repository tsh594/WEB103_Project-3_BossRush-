const express = require('express');
const { getAllLocations, getLocationById } = require('../controllers/locations');
const { getEventsByLocation } = require('../controllers/events');

const router = express.Router();

router.get('/', getAllLocations);
router.get('/:id', getLocationById);
router.get('/:id/events', getEventsByLocation);

module.exports = router;
