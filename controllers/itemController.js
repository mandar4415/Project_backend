// controllers/itemController.js
const Item = require('../models/Item'); // Ensure you import your Item model

// Add a new item for a specific user
exports.addItem = async (req, res) => {
  try {
    const customerId = req.user.id; // Extract customerId from the authenticated user

    // Create a new item with the customerId from the token
    const newItem = new Item({
      name: req.body.name,
      category: req.body.category,
      purchaseDate: req.body.purchaseDate,
      serialNumber: req.body.serialNumber,
      customerId: customerId, // Attach customerId to the item
    });

    await newItem.save();
    res.status(201).json({ message: "Item added successfully", item: newItem });
  } catch (error) {
    res.status(500).json({ message: "Error adding item", error });
  }
};

// Get all items for the authenticated user
exports.getItems = async (req, res) => {
  try {
    const customerId = req.user.id; // Extract customerId

    // Retrieve items belonging to the authenticated user
    const items = await Item.find({ customerId });
    res.status(200).json({ items });
  } catch (error) {
    res.status(500).json({ message: "Error fetching items", error });
  }
};

// Delete a specific item by ID for the authenticated user
exports.deleteItem = async (req, res) => {
  try {
    const customerId = req.user.id; // Extract customerId
    const itemId = req.params.id; // Get item ID from request parameters

    // Find and delete the item only if it belongs to the authenticated user
    const item = await Item.findOneAndDelete({ _id: itemId, customerId });
    
    if (!item) {
      return res.status(404).json({ message: "Item not found or unauthorized" });
    }

    res.status(200).json({ message: "Item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting item", error });
  }
};
