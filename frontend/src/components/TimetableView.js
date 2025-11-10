import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const TimetableView = () => {
  const [timetables, setTimetables] = useState([]);
  const [selectedTimetable, setSelectedTimetable] = useState(null);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState('class'); // 'class' or 'teacher'

  useEffect(() => {
    fetchTimetables();
  }, []);

  const fetchTimetables = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/timetable');
      setTimetables(response.data.data || []);
      if (response.data.data && response.data.data.length > 0) {
        setSelectedTimetable(response.data.data[0]);
      }
    } catch (error) {
      toast.error('Failed to fetch timetables');
      console.error('Error fetching timetables:', error);
    } finally {
      setLoading(false);
    }
  };

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const timeSlots = [
    '09:00-10:00', '10:00-11:00', '11:15-12:15', 
    '12:15-13:15', '14:00-15:00', '15:00-16:00'
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Timetable View</h1>
        <div className="flex space-x-3">
          <select
            value={selectedTimetable?._id || ''}
            onChange={(e) => setSelectedTimetable(timetables.find(t => t._id === e.target.value))}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="">Select Timetable</option>
            {timetables.map(timetable => (
              <option key={timetable._id} value={timetable._id}>
                {timetable.name} - {timetable.department} Sem {timetable.semester}
              </option>
            ))}
          </select>
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setView('class')}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                view === 'class' 
                  ? 'bg-white text-primary-600 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Class View
            </button>
            <button
              onClick={() => setView('teacher')}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                view === 'teacher' 
                  ? 'bg-white text-primary-600 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Teacher View
            </button>
          </div>
        </div>
      </div>

      {!selectedTimetable ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
          <i className="fas fa-calendar-times text-6xl text-gray-300 mb-4"></i>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No Timetable Selected
          </h3>
          <p className="text-gray-600 mb-6">
            Please select a timetable to view the schedule
          </p>
          <button
            onClick={() => window.location.href = '/generate'}
            className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold"
          >
            Generate New Timetable
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Timetable Info */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {selectedTimetable.name}
                </h2>
                <p className="text-gray-600 mt-1">
                  {selectedTimetable.department} • Semester {selectedTimetable.semester} • {selectedTimetable.academicYear}
                </p>
              </div>
              <div className="flex space-x-3">
                <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
                  <i className="fas fa-download"></i>
                  <span>Export PDF</span>
                </button>
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
                  <i className="fas fa-file-excel"></i>
                  <span>Export Excel</span>
                </button>
              </div>
            </div>
          </div>

          {/* Timetable Grid */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-700 uppercase tracking-wider border-r border-gray-200">
                      Time / Day
                    </th>
                    {days.map(day => (
                      <th key={day} className="px-6 py-4 text-center text-sm font-medium text-gray-700 uppercase tracking-wider border-r border-gray-200 last:border-r-0">
                        {day}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {timeSlots.map((timeSlot, timeIndex) => (
                    <tr key={timeSlot} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r border-gray-200 bg-gray-50">
                        {timeSlot}
                      </td>
                      {days.map(day => {
                        const entry = selectedTimetable.entries.find(
                          e => e.day === day && 
                          e.startTime === timeSlot.split('-')[0] &&
                          e.endTime === timeSlot.split('-')[1]
                        );
                        
                        return (
                          <td key={day} className="px-6 py-4 border-r border-gray-200 last:border-r-0">
                            {entry ? (
                              <div className={`p-3 rounded-lg border-l-4 ${
                                entry.type === 'Lab' ? 'bg-purple-50 border-purple-500' :
                                entry.type === 'Project' ? 'bg-green-50 border-green-500' :
                                entry.type === 'Activity' ? 'bg-orange-50 border-orange-500' :
                                'bg-blue-50 border-blue-500'
                              }`}>
                                <div className="text-sm font-semibold text-gray-900">
                                  {entry.subject?.name || 'Subject'}
                                </div>
                                <div className="text-xs text-gray-600 mt-1">
                                  {entry.teacher?.name || 'Teacher'}
                                </div>
                                <div className="text-xs text-gray-500 mt-1">
                                  {entry.classroom?.name || 'Room'} • {entry.type}
                                </div>
                              </div>
                            ) : (
                              <div className="text-center text-gray-400 text-sm py-4">
                                -
                              </div>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Legend */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Legend
            </h3>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-blue-500 rounded"></div>
                <span className="text-sm text-gray-700">Lecture</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-purple-500 rounded"></div>
                <span className="text-sm text-gray-700">Lab</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-green-500 rounded"></div>
                <span className="text-sm text-gray-700">Project</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-orange-500 rounded"></div>
                <span className="text-sm text-gray-700">Activity</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TimetableView;