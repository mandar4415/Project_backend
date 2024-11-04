// controllers/authController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Customer = require('../models/Customer');

// Register a new customer
exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if user already exists
    const existingCustomer = await Customer.findOne({ email });
    if (existingCustomer) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new customer
    const customer = new Customer({
      name,
      email,
      password: hashedPassword,
    });

    await customer.save();

    // Generate JWT token
    const token = jwt.sign({ id: customer._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ message: 'User registered successfully', token });
  } catch (error) {
    console.error('Error registering user:', error); // Log the error for debugging
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Login a customer
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the customer by email
    const customer = await Customer.findOne({ email });
    if (!customer) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Compare the password with the hashed password
    const isMatch = await bcrypt.compare(password, customer.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: customer._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    console.error('Error logging in:', error); // Log the error for debugging
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
