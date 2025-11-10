const mongoose = require('mongoose');
require('dotenv').config();

let isConnected = false;
let demoMode = process.env.FORCE_DEMO_MODE === 'true' || process.env.USE_DEMO_DATA === 'true';

const connectDB = async () => {
  // If forced to demo mode, don't even try to connect
  if (process.env.FORCE_DEMO_MODE === 'true') {
    console.log('🔄 Starting in DEMO MODE (forced by configuration)');
    demoMode = true;
    return { isConnected: false, demoMode: true };
  }

  // If USE_DEMO_DATA is true, use demo mode but still try to connect in background
  if (process.env.USE_DEMO_DATA === 'true') {
    console.log('🔄 Using demo data (USE_DEMO_DATA=true)');
    demoMode = true;
    
    // Still try to connect but don't wait for it
    mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }).then(() => {
      console.log('✅ MongoDB connected (but using demo data)');
      isConnected = true;
    }).catch(() => {
      console.log('❌ MongoDB connection failed (using demo data)');
    });
    
    return { isConnected: false, demoMode: true };
  }

  try {
    if (isConnected) {
      console.log('✅ Using existing MongoDB connection');
      return { isConnected: true, demoMode: false };
    }

    console.log('🔄 Attempting to connect to MongoDB...');
    
    // Set a timeout for connection attempt
    const connectionPromise = mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/nep_smartscheduler', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });

    // Wait for connection with timeout
    await Promise.race([
      connectionPromise,
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Connection timeout')), 5000)
      )
    ]);

    isConnected = true;
    demoMode = false;
    console.log('✅ MongoDB connected successfully');
    return { isConnected: true, demoMode: false };

  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    console.log('🔄 Falling back to DEMO MODE');
    demoMode = true;
    isConnected = false;
    return { isConnected: false, demoMode: true };
  }
};

const getDatabaseStatus = () => {
  return {
    isConnected,
    demoMode,
    mongodbUri: process.env.MONGODB_URI,
    forceDemo: process.env.FORCE_DEMO_MODE === 'true',
    useDemoData: process.env.USE_DEMO_DATA === 'true'
  };
};

const switchToDemoMode = () => {
  demoMode = true;
  if (isConnected) {
    mongoose.connection.close();
    isConnected = false;
  }
  console.log('🔄 Switched to DEMO MODE');
};

const switchToMongoDBMode = async () => {
  demoMode = false;
  return await connectDB();
};

// Initialize connection on require
connectDB().catch(console.error);

module.exports = {
  connectDB,
  getDatabaseStatus,
  switchToDemoMode,
  switchToMongoDBMode,
  isConnected: () => isConnected,
  isDemoMode: () => demoMode
};