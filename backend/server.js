const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();
const port = process.env.PORT || 3000;

const userRoutes = require('./routes/userRoutes');

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

app.use('./api/users', userRoutes);


// mongoose.connect(process.env.MONGO_URI)
// .then(() => console.log('DB connected')).catch(err => console.log(err));

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
