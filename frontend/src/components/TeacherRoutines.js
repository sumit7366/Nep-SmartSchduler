import React, { useState } from 'react';

const TeacherRoutines = ({ demoData, isAdmin }) => {
  const [selectedTeacher, setSelectedTeacher] = useState(demoData.teachers[0]);

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const timeSlots = [
    '08:00-09:00', '09:00-10:00', '10:00-11:00', '11:00-12:00',
    '12:00-13:00', '14:00-15:00', '15:00-16:00', '16:00-17:00'
  ];

  const getScheduleForTimeSlot = (day, timeSlot) => {
    return selectedTeacher.routines.find(
      routine => routine.day === day && routine.time === timeSlot
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Teacher Routines</h1>
          <p className="text-gray-600 mt-1">View detailed weekly schedules for teachers</p>
        </div>
        {isAdmin && (
          <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
            <i className="fas fa-edit"></i>
            <span>Manage Routines</span>
          </button>
        )}
      </div>

      {/* Teacher Selection */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Select Teacher</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {demoData.teachers.map(teacher => (
            <div
              key={teacher._id}
              onClick={() => setSelectedTeacher(teacher)}
              className={`p-4 border rounded-lg cursor-pointer transition-all ${
                selectedTeacher._id === teacher._id
                  ? 'border-blue-500 bg-blue-50 shadow-md'
                  : 'border-gray-200 hover:border-blue-300 hover:shadow-sm'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                  <i className="fas fa-user text-white"></i>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{teacher.name}</h3>
                  <p className="text-sm text-gray-600">{teacher.department}</p>
                  <p className="text-xs text-gray-500">
                    {teacher.subjects.length} subjects • {teacher.routines.length} scheduled
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Teacher Schedule */}
      {selectedTeacher && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          {/* Teacher Header */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold">{selectedTeacher.name}</h2>
                <p className="text-blue-100">{selectedTeacher.department}</p>
                <p className="text-blue-100 text-sm mt-1">
                  {selectedTeacher.qualifications.join(' • ')}
                </p>
              </div>
              <div className="text-right">
                <p className="text-blue-100">Email: {selectedTeacher.email}</p>
                <p className="text-blue-100">Max Hours: {selectedTeacher.maxHoursPerWeek}/week</p>
                <p className="text-blue-100">{selectedTeacher.subjects.length} Subjects</p>
              </div>
            </div>
          </div>

          {/* Weekly Schedule Table */}
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly Schedule</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 border border-gray-200">
                      Time \ Day
                    </th>
                    {days.map(day => (
                      <th key={day} className="px-4 py-3 text-center text-sm font-medium text-gray-700 border border-gray-200">
                        {day}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {timeSlots.map(timeSlot => (
                    <tr key={timeSlot}>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900 bg-gray-50 border border-gray-200">
                        {timeSlot}
                      </td>
                      {days.map(day => {
                        const schedule = getScheduleForTimeSlot(day, timeSlot);
                        return (
                          <td key={day} className="px-4 py-3 text-center border border-gray-200">
                            {schedule ? (
                              <div className={`p-2 rounded text-xs ${
                                schedule.type === 'Lecture' ? 'bg-blue-100 text-blue-800 border border-blue-200' :
                                schedule.type === 'Lab' ? 'bg-purple-100 text-purple-800 border border-purple-200' :
                                schedule.type === 'Tutorial' ? 'bg-green-100 text-green-800 border border-green-200' :
                                'bg-orange-100 text-orange-800 border border-orange-200'
                              }`}>
                                <div className="font-semibold">{schedule.subject}</div>
                                <div className="text-xs opacity-75">{schedule.classroom}</div>
                                <div className="text-xs opacity-75 mt-1">{schedule.type}</div>
                              </div>
                            ) : (
                              <div className="p-2 bg-gray-50 rounded text-gray-400 text-xs border border-gray-200">
                                Free
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
          <div className="border-t border-gray-200 p-6 bg-gray-50">
            <h4 className="text-sm font-semibold text-gray-900 mb-3">Schedule Legend</h4>
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
                <span className="text-sm text-gray-700">Tutorial</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-orange-500 rounded"></div>
                <span className="text-sm text-gray-700">Skill/Project</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherRoutines;