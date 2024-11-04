// middleware/authenticate.js
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    // Retrieve token from the Authorization header
    const authHeader = req.header('Authorization');
    if (!authHeader) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    // Remove "Bearer " prefix to get the token only
    const token = authHeader.replace('Bearer ', '');

    // Verify the token using JWT_SECRET from environment variables
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Attach the user ID to request for use in further middleware/controllers
    req.user = decoded;

    // Proceed to the next middleware or controller
    next();
  } catch (error) {
    // Handle cases where token verification fails
    res.status(401).json({ message: 'Invalid token or token expired' });
  }
};
