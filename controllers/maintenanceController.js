// controllers/maintenanceController.js
const Maintenance = require('../models/Maintenance'); // Make sure you have this model

// Add a maintenance record
exports.addMaintenance = async (req, res) => {
    const { serviceType, dateOfService, cost, itemId } = req.body;

    // Validate input
    if (!serviceType || !dateOfService || !cost || !itemId) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        // Create a new maintenance record
        const maintenanceRecord = new Maintenance({
            serviceType,
            dateOfService,
            cost,
            itemId
        });

        // Save the record to the database
        await maintenanceRecord.save();

        res.status(201).json({ message: 'Maintenance record added successfully', maintenanceRecord });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error adding maintenance record', error: error.message });
    }
};

// Get all maintenance records
exports.getMaintenance = async (req, res) => {
    try {
        // Fetch all maintenance records from the database
        const records = await Maintenance.find().populate('itemId'); // Assuming itemId references an Item

        res.status(200).json(records);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving maintenance records', error: error.message });
    }
};
