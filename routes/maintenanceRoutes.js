// routes/maintenanceRoutes.js
const express = require('express');
const { addMaintenance, getMaintenance } = require('../controllers/maintenanceController');
const auth = require('../middleware/authenticate');

const router = express.Router();

// Route to add a maintenance record
router.post('/add', auth, addMaintenance);

// Route to get maintenance records for items owned by the logged-in user
router.get('/view', auth, getMaintenance);

module.exports = router;
