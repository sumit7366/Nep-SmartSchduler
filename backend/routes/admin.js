const express = require('express');
const router = express.Router();
const { switchToDemoMode, switchToMongoDBMode, getDatabaseStatus } = require('../config/database');

// Get current database status
router.get('/database/status', (req, res) => {
  const status = getDatabaseStatus();
  res.json({
    success: true,
    data: status,
    message: `Current mode: ${status.demoMode ? 'DEMO' : 'MONGODB'}`
  });
});

// Switch to demo mode
router.post('/database/demo-mode', async (req, res) => {
  try {
    switchToDemoMode();
    const status = getDatabaseStatus();
    
    res.json({
      success: true,
      message: 'Switched to DEMO MODE successfully',
      data: status
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to switch to demo mode',
      error: error.message
    });
  }
});

// Switch to MongoDB mode
router.post('/database/mongodb-mode', async (req, res) => {
  try {
    const result = await switchToMongoDBMode();
    
    if (result.demoMode) {
      return res.status(400).json({
        success: false,
        message: 'Failed to connect to MongoDB. Check your connection and try again.',
        data: result
      });
    }

    res.json({
      success: true,
      message: 'Switched to MONGODB MODE successfully',
      data: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to switch to MongoDB mode',
      error: error.message
    });
  }
});

// Test MongoDB connection
router.post('/database/test-connection', async (req, res) => {
  try {
    const { connectionString } = req.body;
    const mongoose = require('mongoose');
    
    // Test the connection
    const testConnection = await mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000
    });
    
    // Close test connection
    await mongoose.disconnect();
    
    res.json({
      success: true,
      message: 'MongoDB connection test successful',
      data: {
        connected: true,
        connectionString: connectionString
      }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'MongoDB connection test failed',
      error: error.message
    });
  }
});

module.exports = router;