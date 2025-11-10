import React from 'react';

const DatabaseStatus = ({ dbStatus, demoMode, onRetry }) => {
  if (dbStatus === 'connected') return null;

  return (
    <div className={`px-4 py-3 ${
      demoMode ? 'bg-yellow-50 border-yellow-200' : 'bg-red-50 border-red-200'
    } border-b`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {demoMode ? (
            <>
              <i className="fas fa-exclamation-triangle text-yellow-600"></i>
              <div>
                <p className="text-sm font-medium text-yellow-800">
                  Demo Mode Active
                </p>
                <p className="text-sm text-yellow-700">
                  Using sample data. Database connection not available.
                </p>
              </div>
            </>
          ) : (
            <>
              <i className="fas fa-exclamation-circle text-red-600"></i>
              <div>
                <p className="text-sm font-medium text-red-800">
                  Database Connection Error
                </p>
                <p className="text-sm text-red-700">
                  Unable to connect to database. Please check your connection.
                </p>
              </div>
            </>
          )}
        </div>
        <button
          onClick={onRetry}
          className={`px-3 py-1 rounded text-sm font-medium ${
            demoMode 
              ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200' 
              : 'bg-red-100 text-red-800 hover:bg-red-200'
          }`}
        >
          Retry Connection
        </button>
      </div>
    </div>
  );
};

export default DatabaseStatus;