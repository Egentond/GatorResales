const cors = require('cors'); // Import cors

const corsOptions = {
  origin: 'http://localhost:5174', // Update to match your front-end domain
  credentials: true, // Enable credentials
};

module.exports = cors(corsOptions); // Export cors with options