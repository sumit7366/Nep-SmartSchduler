import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const DatabaseManager = ({ currentMode, onModeChange }) => {
  const [dbStatus, setDbStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [connectionString, setConnectionString] = useState('mongodb://localhost:27017/nep_smartscheduler');
  const [showConnectionTest, setShowConnectionTest] = useState(false);

  useEffect(() => {
    fetchDatabaseStatus();
  }, []);

  const fetchDatabaseStatus = async () => {
    try {
      const response = await axios.get('/api/admin/database/status');
      setDbStatus(response.data.data);
    } catch (error) {
      toast.error('Failed to fetch database status');
    }
  };

  const switchToDemoMode = async () => {
    setLoading(true);
    try {
      const response = await axios.post('/api/admin/database/demo-mode');
      toast.success(response.data.message);
      setDbStatus(response.data.data);
      onModeChange('demo');
    } catch (error) {
      toast.error('Failed to switch to demo mode');
    } finally {
      setLoading(false);
    }
  };

  const switchToMongoDBMode = async () => {
    setLoading(true);
    try {
      const response = await axios.post('/api/admin/database/mongodb-mode');
      if (response.data.success) {
        toast.success(response.data.message);
        setDbStatus(response.data.data);
        onModeChange('mongodb');
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error('Failed to switch to MongoDB mode');
    } finally {
      setLoading(false);
    }
  };

  const testConnection = async () => {
    setLoading(true);
    try {
      const response = await axios.post('/api/admin/database/test-connection', {
        connectionString
      });
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Connection test failed');
    } finally {
      setLoading(false);
    }
  };

  if (!dbStatus) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Current Status */}
      <div className={`p-6 rounded-lg border ${
        dbStatus.demoMode 
          ? 'bg-yellow-50 border-yellow-200' 
          : 'bg-green-50 border-green-200'
      }`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`w-3 h-3 rounded-full ${
              dbStatus.demoMode ? 'bg-yellow-500' : 'bg-green-500'
            }`}></div>
            <div>
              <h3 className="text-lg font-semibold">
                Current Mode: {dbStatus.demoMode ? 'Demo Mode' : 'MongoDB Mode'}
              </h3>
              <p className="text-sm opacity-75">
                {dbStatus.demoMode 
                  ? 'Using sample data. No database connection required.' 
                  : `Connected to: ${dbStatus.mongodbUri}`
                }
              </p>
            </div>
          </div>
          <button
            onClick={fetchDatabaseStatus}
            className="px-3 py-1 text-sm bg-white border border-gray-300 rounded hover:bg-gray-50"
          >
            Refresh
          </button>
        </div>
      </div>

      {/* Mode Switching Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Demo Mode Card */}
        <div className={`border rounded-lg p-6 ${
          dbStatus.demoMode 
            ? 'border-yellow-300 bg-yellow-25' 
            : 'border-gray-200 bg-white'
        }`}>
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
              <i className="fas fa-database text-yellow-600"></i>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Demo Mode</h3>
              <p className="text-sm text-gray-600">Use sample data</p>
            </div>
          </div>
          
          <ul className="text-sm text-gray-600 space-y-2 mb-4">
            <li className="flex items-center space-x-2">
              <i className="fas fa-check text-green-500"></i>
              <span>No database setup required</span>
            </li>
            <li className="flex items-center space-x-2">
              <i className="fas fa-check text-green-500"></i>
              <span>Pre-loaded sample data</span>
            </li>
            <li className="flex items-center space-x-2">
              <i className="fas fa-check text-green-500"></i>
              <span>Perfect for testing and demo</span>
            </li>
          </ul>

          <button
            onClick={switchToDemoMode}
            disabled={dbStatus.demoMode || loading}
            className={`w-full py-2 px-4 rounded font-medium ${
              dbStatus.demoMode
                ? 'bg-yellow-100 text-yellow-700 cursor-not-allowed'
                : 'bg-yellow-500 hover:bg-yellow-600 text-white'
            }`}
          >
            {dbStatus.demoMode ? 'Currently Active' : 'Switch to Demo Mode'}
          </button>
        </div>

        {/* MongoDB Mode Card */}
        <div className={`border rounded-lg p-6 ${
          !dbStatus.demoMode 
            ? 'border-green-300 bg-green-25' 
            : 'border-gray-200 bg-white'
        }`}>
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <i className="fas fa-server text-green-600"></i>
            </div>
            <div>
              <h3 className="text-lg font-semibold">MongoDB Mode</h3>
              <p className="text-sm text-gray-600">Use real database</p>
            </div>
          </div>
          
          <ul className="text-sm text-gray-600 space-y-2 mb-4">
            <li className="flex items-center space-x-2">
              <i className="fas fa-check text-green-500"></i>
              <span>Persistent data storage</span>
            </li>
            <li className="flex items-center space-x-2">
              <i className="fas fa-check text-green-500"></i>
              <span>Real-time data updates</span>
            </li>
            <li className="flex items-center space-x-2">
              <i className="fas fa-check text-green-500"></i>
              <span>Production ready</span>
            </li>
          </ul>

          <button
            onClick={switchToMongoDBMode}
            disabled={!dbStatus.demoMode || loading}
            className={`w-full py-2 px-4 rounded font-medium ${
              !dbStatus.demoMode
                ? 'bg-green-100 text-green-700 cursor-not-allowed'
                : 'bg-green-500 hover:bg-green-600 text-white'
            }`}
          >
            {!dbStatus.demoMode ? 'Currently Active' : 'Switch to MongoDB Mode'}
          </button>
        </div>
      </div>

      {/* Connection Test Section */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Test MongoDB Connection</h3>
          <button
            onClick={() => setShowConnectionTest(!showConnectionTest)}
            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            {showConnectionTest ? 'Hide' : 'Show'} Test
          </button>
        </div>

        {showConnectionTest && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Connection String
              </label>
              <input
                type="text"
                value={connectionString}
                onChange={(e) => setConnectionString(e.target.value)}
                placeholder="mongodb://localhost:27017/nep_smartscheduler"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-xs text-gray-500 mt-1">
                Format: mongodb://[username:password@]host[:port]/database
              </p>
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={testConnection}
                disabled={loading}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded font-medium disabled:bg-blue-300"
              >
                {loading ? 'Testing...' : 'Test Connection'}
              </button>
              <button
                onClick={() => setConnectionString('mongodb://localhost:27017/nep_smartscheduler')}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded font-medium"
              >
                Use Default
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Instructions */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-3">
          Setup Instructions
        </h3>
        <div className="space-y-2 text-sm text-blue-800">
          <p><strong>For MongoDB Mode:</strong></p>
          <ol className="list-decimal list-inside space-y-1 ml-4">
            <li>Install MongoDB on your system</li>
            <li>Start MongoDB service (mongod)</li>
            <li>Ensure the connection string is correct</li>
            <li>Click "Switch to MongoDB Mode"</li>
          </ol>
          <p className="mt-3"><strong>For Demo Mode:</strong></p>
          <p>No setup required - perfect for quick testing and evaluation.</p>
        </div>
      </div>
    </div>
  );
};

export default DatabaseManager;