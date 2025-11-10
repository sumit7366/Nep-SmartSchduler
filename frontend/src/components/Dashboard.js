import React from 'react';

const Dashboard = ({ demoData, isAdmin }) => {
  const stats = {
    teachers: demoData.teachers.length,
    classrooms: demoData.classrooms.length,
    subjects: demoData.subjects.length,
    timetables: demoData.timetables.length
  };

  const StatCard = ({ title, value, icon, color, description }) => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex items-center">
          <div className={`p-3 rounded-lg ${color}`}>
            <i className={`${icon} text-white text-xl`}></i>
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
            {description && (
              <p className="text-xs text-gray-500 mt-1">{description}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">
            Welcome to NEP SmartScheduler - AI Powered Timetable Generator
            {isAdmin && (
              <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                Admin Mode
              </span>
            )}
          </p>
        </div>
        <div className="flex space-x-3">
          {isAdmin && (
            <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
              <i className="fas fa-sync-alt"></i>
              <span>Refresh Data</span>
            </button>
          )}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Teachers"
          value={stats.teachers}
          icon="fas fa-chalkboard-teacher"
          color="bg-blue-500"
          description="Active faculty members"
        />
        <StatCard
          title="Classrooms & Labs"
          value={stats.classrooms}
          icon="fas fa-door-open"
          color="bg-green-500"
          description="Available spaces"
        />
        <StatCard
          title="Subjects"
          value={stats.subjects}
          icon="fas fa-book"
          color="bg-purple-500"
          description="Courses offered"
        />
        <StatCard
          title="Timetables"
          value={stats.timetables}
          icon="fas fa-calendar-alt"
          color="bg-orange-500"
          description="Generated schedules"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Quick Actions
          </h3>
          <div className="space-y-3">
            <button 
              onClick={() => window.location.href = '/teachers'}
              className="w-full bg-blue-50 hover:bg-blue-100 text-blue-700 px-4 py-3 rounded-lg flex items-center space-x-3 text-left transition-colors"
            >
              <i className="fas fa-users text-blue-500"></i>
              <div>
                <span className="font-medium">View Teachers</span>
                <p className="text-xs text-blue-600">Browse faculty members and schedules</p>
              </div>
            </button>
            <button 
              onClick={() => window.location.href = '/teacher-routines'}
              className="w-full bg-green-50 hover:bg-green-100 text-green-700 px-4 py-3 rounded-lg flex items-center space-x-3 text-left transition-colors"
            >
              <i className="fas fa-calendar-alt text-green-500"></i>
              <div>
                <span className="font-medium">Teacher Routines</span>
                <p className="text-xs text-green-600">View weekly schedules</p>
              </div>
            </button>
            <button 
              onClick={() => window.location.href = '/timetable'}
              className="w-full bg-purple-50 hover:bg-purple-100 text-purple-700 px-4 py-3 rounded-lg flex items-center space-x-3 text-left transition-colors"
            >
              <i className="fas fa-calendar-check text-purple-500"></i>
              <div>
                <span className="font-medium">View Timetables</span>
                <p className="text-xs text-purple-600">Check generated schedules</p>
              </div>
            </button>
          </div>
        </div>

        {/* Teacher Overview */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Teacher Overview
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <i className="fas fa-clock text-blue-600"></i>
                <span className="text-sm font-medium text-blue-800">Total Weekly Hours</span>
              </div>
              <span className="text-lg font-bold text-blue-900">
                {demoData.teachers.reduce((total, teacher) => total + teacher.maxHoursPerWeek, 0)}
              </span>
            </div>
            <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <i className="fas fa-book text-green-600"></i>
                <span className="text-sm font-medium text-green-800">Total Subjects</span>
              </div>
              <span className="text-lg font-bold text-green-900">
                {demoData.teachers.reduce((total, teacher) => total + teacher.subjects.length, 0)}
              </span>
            </div>
            <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <i className="fas fa-building text-purple-600"></i>
                <span className="text-sm font-medium text-purple-800">Departments</span>
              </div>
              <span className="text-lg font-bold text-purple-900">
                {new Set(demoData.teachers.map(t => t.department)).size}
              </span>
            </div>
          </div>
        </div>

        {/* Admin Features */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {isAdmin ? 'Admin Controls' : 'Get Admin Access'}
          </h3>
          <div className="space-y-3">
            {isAdmin ? (
              <>
                <button 
                  onClick={() => window.location.href = '/teachers'}
                  className="w-full bg-green-50 hover:bg-green-100 text-green-700 px-4 py-3 rounded-lg flex items-center space-x-3 text-left transition-colors"
                >
                  <i className="fas fa-edit text-green-500"></i>
                  <div>
                    <span className="font-medium">Manage Teachers</span>
                    <p className="text-xs text-green-600">Add, edit, or remove faculty</p>
                  </div>
                </button>
                <button 
                  onClick={() => window.location.href = '/generate'}
                  className="w-full bg-blue-50 hover:bg-blue-100 text-blue-700 px-4 py-3 rounded-lg flex items-center space-x-3 text-left transition-colors"
                >
                  <i className="fas fa-calendar-plus text-blue-500"></i>
                  <div>
                    <span className="font-medium">Generate Timetable</span>
                    <p className="text-xs text-blue-600">Create new schedules</p>
                  </div>
                </button>
              </>
            ) : (
              <div className="text-center p-4 bg-yellow-50 rounded-lg">
                <i className="fas fa-lock text-yellow-600 text-2xl mb-2"></i>
                <p className="text-sm text-yellow-700">
                  Admin access required for management features
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Recent Teachers */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Recent Teachers</h3>
          <button 
            onClick={() => window.location.href = '/teachers'}
            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            View All
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {demoData.teachers.slice(0, 4).map(teacher => (
            <div key={teacher._id} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                  <i className="fas fa-user text-white"></i>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{teacher.name}</h4>
                  <p className="text-sm text-gray-600">{teacher.department}</p>
                  <p className="text-xs text-gray-500">{teacher.subjects.length} subjects</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;