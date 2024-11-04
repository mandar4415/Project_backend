// models/Maintenance.js
const mongoose = require('mongoose');

const maintenanceSchema = new mongoose.Schema({
    serviceType: {
        type: String,
        required: true
    },
    dateOfService: {
        type: Date,
        required: true
    },
    cost: {
        type: Number,
        required: true
    },
    itemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item', // Assuming you have an Item model
        required: true
    }
}, { timestamps: true }); // Automatically adds createdAt and updatedAt fields

const Maintenance = mongoose.model('Maintenance', maintenanceSchema);

module.exports = Maintenance;
