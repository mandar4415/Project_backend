// utils/tokenUtils.js
const jwt_decode = require('jwt-decode');

function decodeToken(token) {
  const decoded = jwt_decode(token);
  return decoded.id; // or another payload property like decoded.user
}

module.exports = { decodeToken };
