const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors({ // Allow requests from the frontend
    origin: 'http://localhost:5173',
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

// User and ticket routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/tickets', require('./routes/ticketRoutes'));

// Stripe routes
app.use('/api/stripe', require('./routes/stripeRoutes'));

const uri = process.env.MONGODB_URI; // MongoDB connection string

mongoose.connect(uri) // Connect to MongoDB
.then(() => {
    console.log('Connected to MongoDB'); // Log success message
})
.catch(err => {
    console.error('Error connecting to MongoDB:', err); // Log error message
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`); // Log success message
});