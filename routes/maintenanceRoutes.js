// routes/maintenanceRoutes.js
const express = require('express');
const { addMaintenance, getMaintenance, deleteMaintenance} = require('../controllers/maintenanceController');
const auth = require('../middleware/authenticate');

const router = express.Router();

// Route to add a maintenance record
router.post('/add', auth, addMaintenance);

// Route to get maintenance records for items owned by the logged-in user
router.get('/view', auth, getMaintenance);

// Route to delete a maintenance record by ID
router.delete('/:id', auth, deleteMaintenance);

module.exports = router;
