import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = ({ isAdmin, currentView, onViewChange }) => {
  const location = useLocation();

  const menuItems = [
    { path: '/', icon: 'fas fa-home', label: 'Dashboard' },
    { path: '/teachers', icon: 'fas fa-chalkboard-teacher', label: 'Teachers' },
    { path: '/teacher-routines', icon: 'fas fa-calendar-alt', label: 'Teacher Routines' },
    { path: '/classrooms', icon: 'fas fa-door-open', label: 'Classrooms' },
    { path: '/subjects', icon: 'fas fa-book', label: 'Subjects' },
    { path: '/generate', icon: 'fas fa-calendar-plus', label: 'Generate' },
    { path: '/timetable', icon: 'fas fa-calendar-check', label: 'Timetable' },
  ];

  return (
    <div className="sidebar w-64 bg-gray-800 text-white">
      <div className="p-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
            <i className="fas fa-calendar-check text-white"></i>
          </div>
          <div>
            <h2 className="text-lg font-bold">NEP Scheduler</h2>
            <p className="text-xs text-gray-400">v1.0.0</p>
          </div>
        </div>
      </div>
      
      <nav className="mt-6">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            onClick={() => onViewChange(item.label.toLowerCase())}
            className={`flex items-center px-6 py-3 text-sm font-medium transition-colors ${
              location.pathname === item.path
                ? 'bg-blue-600 text-white'
                : 'text-gray-300 hover:bg-gray-700 hover:text-white'
            }`}
          >
            <i className={`${item.icon} w-6 mr-3 text-center`}></i>
            {item.label}
          </Link>
        ))}
      </nav>
      
      <div className="absolute bottom-0 w-64 p-6 border-t border-gray-700">
        <div className={`flex items-center space-x-3 ${isAdmin ? 'text-green-400' : 'text-gray-400'}`}>
          <div className={`w-3 h-3 rounded-full ${isAdmin ? 'bg-green-400' : 'bg-gray-400'}`}></div>
          <div>
            <p className="text-sm font-medium">
              {isAdmin ? 'Admin Mode' : 'View Mode'}
            </p>
            <p className="text-xs text-gray-400">
              {isAdmin ? 'Full access' : 'Read-only access'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;