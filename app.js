const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: "./config/config.env"});

const app = express();

// Connect to MongoDB database using mongoose
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('Connected to MongoDB successfully'))
    .catch(err => console.log('Connection Error:', err));

// Import user routes
const routes = require('./routes/users');

// Middleware to parse incoming JSON request
app.use(express.json());

// Use the routes
app.use('/', routes);

const PORT = process.env.PORT || 3000;

// Start the server and listen on the specified port
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
