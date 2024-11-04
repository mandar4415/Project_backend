// routes/itemRoutes.js
const express = require('express');
const { addItem, getItems, deleteItem } = require('../controllers/itemController');
const auth = require('../middleware/authenticate');

const router = express.Router();

// Route to add an item
router.post('/add', auth, addItem);

// Route to get all items for the logged-in user
router.get('/view', auth, getItems);

// Route to delete an item by ID
router.delete('/delete/:id', auth, deleteItem);

module.exports = router;
