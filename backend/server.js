// server.js
require('dotenv').config();
const express = require('express');
const connectDB = require('./src/config/db');

connectDB();

const app = express();
app.use(express.json());

// Routes
app.use('/api/items', require('./src/routes/itemRoutes'));
app.use('/api/path', require('./src/routes/pathRoutes'));

// Health
app.get('/', (req, res) => res.send('NavCart backend is running'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
