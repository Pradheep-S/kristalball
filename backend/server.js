const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

// Import database connection
const connectDB = require('./config/db');

// Import routes
const authRoutes = require('./routes/authRoutes');
const assetRoutes = require('./routes/assetRoutes');
const transferRoutes = require('./routes/transferRoutes');
const purchaseRoutes = require('./routes/purchaseRoutes');
const assignmentRoutes = require('./routes/assignmentRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:3001',
    process.env.FRONTEND_URL
  ].filter(Boolean),
  credentials: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Trust proxy for getting real IP addresses
app.set('trust proxy', true);

// Logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/assets', assetRoutes);
app.use('/api/transfers', transferRoutes);
app.use('/api/purchases', purchaseRoutes);
app.use('/api/assignments', assignmentRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ 
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start server with database connection
const startServer = async () => {
  try {
    // Try to connect to MongoDB
    const dbConnection = await connectDB();
    
    // Start the Express server
    app.listen(PORT, () => {
      console.log(`🚀 Military Asset Management Server running on port ${PORT}`);
      console.log(`📊 API Documentation available at http://localhost:${PORT}/health`);
      
      if (dbConnection) {
        console.log(`🔗 MongoDB connection status: Connected`);
        console.log(`📝 To seed database with demo data, run: node seedData.js`);
      } else {
        console.log(`⚠️  MongoDB connection status: Not connected (using fallback storage)`);
        console.log(`📝 Set up MongoDB Atlas and update .env file for persistent storage`);
      }
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

module.exports = app;