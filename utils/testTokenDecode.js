// testTokenDecode.js
const { decodeToken } = require('../utils/tokenUtils');

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MmIzNmUyNzQwNjc1NTI3MmNmYjliMCIsImlhdCI6MTczMDg4NTUxMSwiZXhwIjoxNzMwODg5MTExfQ.16kDrG853dh9xOU_LO6ua-5XzUnoQPazNkjyaMUAnw0"; // Replace with an actual token
const customerId = decodeToken(token);

console.log("Customer ID from token:", customerId);


