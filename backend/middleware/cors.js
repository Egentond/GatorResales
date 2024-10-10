const cors = require('cors');

const corsOptions = {
  origin: 'http://localhost:5174', // Update to match your front-end domain
  credentials: true,
};

module.exports = cors(corsOptions);
