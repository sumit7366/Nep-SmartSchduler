import React from 'react';

const Footer = ({ onAdminLogin, isAdmin }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white border-t border-gray-700">
      <div className="container mx-auto px-6 py-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <i className="fas fa-calendar-check text-blue-400"></i>
            <span className="font-semibold">NEP SmartScheduler</span>
          </div>
          
          <div className="text-center md:text-left mb-4 md:mb-0">
            <p className="text-gray-400 text-sm">
              &copy; {currentYear} NEP SmartScheduler. All rights reserved.
            </p>
            <p className="text-gray-500 text-xs mt-1">
              AI-Powered Timetable Generator for NEP 2020 Compliance
            </p>
          </div>

          <div className="flex items-center space-x-4">
            {!isAdmin ? (
              <button
                onClick={onAdminLogin}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center space-x-2 transition-colors"
              >
                <i className="fas fa-lock"></i>
                <span>Admin Login</span>
              </button>
            ) : (
              <span className="px-3 py-2 bg-green-100 text-green-800 text-sm rounded-full font-medium">
                Admin Mode Active
              </span>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;