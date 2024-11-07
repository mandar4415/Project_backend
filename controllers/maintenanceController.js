const Maintenance = require('../models/Maintenance'); // Ensure you have this model
const Item = require('../models/Item'); // Ensure you have an Item model

// Add a maintenance record
exports.addMaintenance = async (req, res) => {
    const { serviceType, dateOfService, cost, itemId } = req.body;
    const userId = req.user._id; // The user ID is fetched from the JWT token (after authentication)

    // Validate input fields
    if (!serviceType || !dateOfService || !cost || !itemId) {
        return res.status(400).json({ message: 'All fields (serviceType, dateOfService, cost, itemId) are required' });
    }

    try {
        // Check if the item exists (optional but a good practice)
        const item = await Item.findById(itemId);
        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }

        // Create a new maintenance record and associate it with the user and item
        const maintenanceRecord = new Maintenance({
            serviceType,
            dateOfService,
            cost,
            itemId,
            userId // Store the user ID in the maintenance record
        });

        // Save the maintenance record to the database
        await maintenanceRecord.save();

        // Respond with success
        res.status(201).json({
            message: 'Maintenance record added successfully',
            maintenanceRecord
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error adding maintenance record', error: error.message });
    }
};

// Get all maintenance records (optionally filter by user)
exports.getMaintenance = async (req, res) => {
    try {
        // Fetch all maintenance records associated with the logged-in user
        const records = await Maintenance.find({ userId: req.user._id }).populate('itemId');

        res.status(200).json(records);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving maintenance records', error: error.message });
    }
};

exports.deleteMaintenance = async (req, res) => {
    const { id } = req.params;
    const userId = req.user._id; // The user ID from the JWT token (after authentication)

    try {
        // Find the maintenance record by ID and check if it belongs to the logged-in user
        const maintenanceRecord = await Maintenance.findOne({ _id: id, userId });

        if (!maintenanceRecord) {
            return res.status(404).json({ message: 'Maintenance record not found or you are not authorized to delete it' });
        }

        // Delete the maintenance record
        await maintenanceRecord.remove();

        res.status(200).json({ message: 'Maintenance record deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting maintenance record', error: error.message });
    }
};