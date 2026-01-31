const express = require('express');
const cors = require('cors');
const connectDB = require('./src/config/database');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const authRoutes = require('./src/routes/auth');
app.use('/api/auth', authRoutes);

// Health check
app.get('/', (req, res) => {
    res.json({ message: 'Backend API is and running!' });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

// 404 handler - catch all unmatched routes
app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});