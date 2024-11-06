// decodetoken.js
const jwt_decode = require('jwt-decode');

// Replace with an actual JWT token string for testing
const token = "your.jwt.token.here";

const decodedToken = jwt_decode(token);
const customerId = decodedToken.id;

console.log("Decoded Customer ID:", customerId);
