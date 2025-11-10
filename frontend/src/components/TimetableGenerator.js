import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const TimetableGenerator = () => {
  const [departments, setDepartments] = useState([]);
  const [formData, setFormData] = useState({
    department: '',
    semester: '',
    academicYear: '2024-25',
    constraints: {
      maxHoursPerDay: 8,
      includeSkillPeriods: true,
      includeActivityBlocks: true,
      includeInterdisciplinary: true
    }
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Extract departments from existing data or use defaults
    setDepartments(['Computer Science', 'Electronics', 'Mechanical', 'Civil', 'Mathematics']);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await axios.post('/api/timetable/generate', formData);
      toast.success('Timetable generated successfully!');
      console.log('Generated timetable:', response.data);
    } catch (error) {
      toast.error('Failed to generate timetable');
      console.error('Error generating timetable:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.startsWith('constraints.')) {
      const constraintName = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        constraints: {
          ...prev.constraints,
          [constraintName]: type === 'checkbox' ? checked : value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Timetable Generator</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Generation Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Generate New Timetable
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Department
                  </label>
                  <select
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    required
                  >
                    <option value="">Select Department</option>
                    {departments.map(dept => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Semester
                  </label>
                  <select
                    name="semester"
                    value={formData.semester}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    required
                  >
                    <option value="">Select Semester</option>
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(sem => (
                      <option key={sem} value={sem}>Semester {sem}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Academic Year
                  </label>
                  <input
                    type="text"
                    name="academicYear"
                    value={formData.academicYear}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Max Hours Per Day
                  </label>
                  <input
                    type="number"
                    name="constraints.maxHoursPerDay"
                    value={formData.constraints.maxHoursPerDay}
                    onChange={handleInputChange}
                    min="4"
                    max="10"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>

              {/* NEP Constraints */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  NEP 2020 Constraints
                </h3>
                <div className="space-y-3">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="constraints.includeSkillPeriods"
                      checked={formData.constraints.includeSkillPeriods}
                      onChange={handleInputChange}
                      className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      Include Skill/Vocational Periods
                    </span>
                  </label>
                  
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="constraints.includeActivityBlocks"
                      checked={formData.constraints.includeActivityBlocks}
                      onChange={handleInputChange}
                      className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      Include Activity/Project Blocks
                    </span>
                  </label>
                  
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="constraints.includeInterdisciplinary"
                      checked={formData.constraints.includeInterdisciplinary}
                      onChange={handleInputChange}
                      className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      Include Interdisciplinary Periods
                    </span>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary-500 hover:bg-primary-600 disabled:bg-gray-400 text-white py-3 px-4 rounded-lg font-semibold flex items-center justify-center space-x-2"
              >
                {loading ? (
                  <>
                    <div className="loading-spinner w-5 h-5 border-2"></div>
                    <span>Generating Timetable...</span>
                  </>
                ) : (
                  <>
                    <i className="fas fa-magic"></i>
                    <span>Generate Timetable with AI</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Information Panel */}
        <div className="space-y-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-3">
              AI-Powered Generation
            </h3>
            <ul className="space-y-2 text-sm text-blue-800">
              <li className="flex items-start space-x-2">
                <i className="fas fa-check-circle text-blue-500 mt-0.5"></i>
                <span>Automatic conflict detection and resolution</span>
              </li>
              <li className="flex items-start space-x-2">
                <i className="fas fa-check-circle text-blue-500 mt-0.5"></i>
                <span>NEP 2020 compliance validation</span>
              </li>
              <li className="flex items-start space-x-2">
                <i className="fas fa-check-circle text-blue-500 mt-0.5"></i>
                <span>Optimal resource utilization</span>
              </li>
              <li className="flex items-start space-x-2">
                <i className="fas fa-check-circle text-blue-500 mt-0.5"></i>
                <span>Balanced workload distribution</span>
              </li>
            </ul>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-green-900 mb-3">
              NEP 2020 Features
            </h3>
            <ul className="space-y-2 text-sm text-green-800">
              <li className="flex items-start space-x-2">
                <i className="fas fa-graduation-cap text-green-500 mt-0.5"></i>
                <span>Skill development periods</span>
              </li>
              <li className="flex items-start space-x-2">
                <i className="fas fa-project-diagram text-green-500 mt-0.5"></i>
                <span>Project-based learning blocks</span>
              </li>
              <li className="flex items-start space-x-2">
                <i className="fas fa-exchange-alt text-green-500 mt-0.5"></i>
                <span>Interdisciplinary courses</span>
              </li>
              <li className="flex items-start space-x-2">
                <i className="fas fa-balance-scale text-green-500 mt-0.5"></i>
                <span>Flexible learning pathways</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimetableGenerator;