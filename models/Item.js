// models/Item.js
const mongoose = require('mongoose');
const ItemSchema = new mongoose.Schema({
  name: String,
  category: String,
  purchaseDate: Date,
  serialNumber: String,
  image: String,
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
});
module.exports = mongoose.model('Item', ItemSchema);
