const express = require('express');
const { getAllEvents } = require('../controllers/events');

const router = express.Router();

router.get('/', getAllEvents);

module.exports = router;
