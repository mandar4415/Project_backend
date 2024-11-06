const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    purchaseDate: {
        type: Date,
        required: true
    },
    serialNumber: {
        type: String,
        required: true
    },
    image: {
        type: String, // URL to the image or store the image binary
    },
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer', // Link to Customer
        required: true
    }
}, { timestamps: true });

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
