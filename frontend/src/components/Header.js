import React from 'react';

const Header = ({ dbStatus, demoMode }) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="flex items-center justify-between px-6 py-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            NEP SmartScheduler
          </h1>
          <p className="text-sm text-gray-600">
            AI-Powered Timetable Generator for NEP 2020
            {demoMode && (
              <span className="ml-2 px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                DEMO MODE
              </span>
            )}
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <div className={`px-3 py-1 rounded-full text-xs font-medium ${
            dbStatus === 'connected' 
              ? 'bg-green-100 text-green-800' 
              : 'bg-yellow-100 text-yellow-800'
          }`}>
            {dbStatus === 'connected' ? 'DB Connected' : 'Demo Mode'}
          </div>
          <div className="text-right">
            <p className="text-sm font-medium text-gray-900">Admin User</p>
            <p className="text-xs text-gray-600">Administrator</p>
          </div>
          <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center">
            <span className="text-white font-semibold">A</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;