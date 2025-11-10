import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Dashboard from './components/Dashboard';
import TeacherManagement from './components/TeacherManagement';
import ClassroomManagement from './components/ClassroomManagement';
import SubjectManagement from './components/SubjectManagement';
import TimetableGenerator from './components/TimetableGenerator';
import TimetableView from './components/TimetableView';
import TeacherRoutines from './components/TeacherRoutines';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Footer from './components/Footer';
import AdminLogin from './components/AdminLogin';

// Demo data that will be used throughout the app
const demoData = {
  teachers: [
    {
      _id: '1',
      name: 'Dr. Rajesh Kumar',
      email: 'rajesh.kumar@college.edu',
      department: 'Computer Science',
      maxHoursPerWeek: 40,
      qualifications: ['PhD in Computer Science', 'M.Tech in AI'],
      subjects: ['CS101', 'CS102', 'CSS101'],
      routines: [
        { day: 'Monday', time: '09:00-10:00', subject: 'Introduction to Programming', classroom: 'CS-101', type: 'Lecture' },
        { day: 'Monday', time: '11:00-12:00', subject: 'Data Structures', classroom: 'CS-102', type: 'Lecture' },
        { day: 'Tuesday', time: '09:00-11:00', subject: 'Programming Lab', classroom: 'Lab-A', type: 'Lab' },
        { day: 'Wednesday', time: '14:00-16:00', subject: 'Web Development', classroom: 'Lab-B', type: 'Skill' }
      ],
      isActive: true
    },
    {
      _id: '2',
      name: 'Prof. Priya Sharma',
      email: 'priya.sharma@college.edu',
      department: 'Mathematics', 
      maxHoursPerWeek: 35,
      qualifications: ['PhD in Mathematics', 'M.Sc in Statistics'],
      subjects: ['MATH101', 'MATH102'],
      routines: [
        { day: 'Monday', time: '10:00-11:00', subject: 'Calculus', classroom: 'CS-101', type: 'Lecture' },
        { day: 'Tuesday', time: '14:00-16:00', subject: 'Mathematics Lab', classroom: 'Lab-A', type: 'Lab' },
        { day: 'Wednesday', time: '09:00-10:00', subject: 'Linear Algebra', classroom: 'CS-102', type: 'Lecture' }
      ],
      isActive: true
    },
    {
      _id: '3',
      name: 'Dr. Amit Patel',
      email: 'amit.patel@college.edu',
      department: 'Electronics',
      maxHoursPerWeek: 38,
      qualifications: ['PhD in Electronics', 'M.Tech in VLSI'],
      subjects: ['EC101', 'EC102', 'ECL101'],
      routines: [
        { day: 'Monday', time: '14:00-16:00', subject: 'Electronics Lab', classroom: 'Lab-A', type: 'Lab' },
        { day: 'Tuesday', time: '09:00-10:00', subject: 'Basic Electronics', classroom: 'EC-201', type: 'Lecture' },
        { day: 'Wednesday', time: '11:00-12:00', subject: 'Digital Circuits', classroom: 'EC-201', type: 'Lecture' }
      ],
      isActive: true
    },
    {
      _id: '4',
      name: 'Dr. Sunita Reddy',
      email: 'sunita.reddy@college.edu',
      department: 'Physics',
      maxHoursPerWeek: 36,
      qualifications: ['PhD in Physics', 'M.Sc in Nuclear Physics'],
      subjects: ['PHY101', 'PHYL101'],
      routines: [
        { day: 'Monday', time: '11:00-12:00', subject: 'Engineering Physics', classroom: 'PH-101', type: 'Lecture' },
        { day: 'Tuesday', time: '10:00-12:00', subject: 'Physics Lab', classroom: 'PH-101', type: 'Lab' }
      ],
      isActive: true
    }
  ],
  classrooms: [
    {
      _id: '1',
      name: 'CS-101',
      capacity: 60,
      type: 'Lecture Hall',
      facilities: ['Projector', 'Whiteboard', 'AC', 'Sound System'],
      isActive: true
    },
    {
      _id: '2',
      name: 'CS-102',
      capacity: 45,
      type: 'Lecture Hall', 
      facilities: ['Projector', 'Whiteboard', 'AC'],
      isActive: true
    },
    {
      _id: '3',
      name: 'Lab-A',
      capacity: 30,
      type: 'Lab',
      facilities: ['Computers', 'Projector', 'Network', 'Software Tools'],
      isActive: true
    },
    {
      _id: '4',
      name: 'Lab-B',
      capacity: 25,
      type: 'Lab',
      facilities: ['Computers', 'Specialized Software', 'Network'],
      isActive: true
    }
  ],
  subjects: [
    {
      _id: '1',
      code: 'CS101',
      name: 'Introduction to Programming',
      credits: 4,
      type: 'Theory',
      hoursPerWeek: 4,
      department: 'Computer Science',
      semester: 1,
      nepCompliant: true,
      teachers: ['Dr. Rajesh Kumar']
    },
    {
      _id: '2',
      code: 'CS102', 
      name: 'Data Structures and Algorithms',
      credits: 4,
      type: 'Theory',
      hoursPerWeek: 4,
      department: 'Computer Science',
      semester: 2,
      nepCompliant: true,
      teachers: ['Dr. Rajesh Kumar']
    },
    {
      _id: '3',
      code: 'MATH101',
      name: 'Calculus and Geometry',
      credits: 4,
      type: 'Theory',
      hoursPerWeek: 4,
      department: 'Mathematics',
      semester: 1,
      nepCompliant: false,
      teachers: ['Prof. Priya Sharma']
    }
  ],
  timetables: [
    {
      _id: '1',
      name: 'Computer Science Semester 1 Timetable',
      department: 'Computer Science',
      semester: 1,
      academicYear: '2024-25',
      entries: [
        {
          day: 'Monday',
          startTime: '09:00',
          endTime: '10:00',
          subject: 'Introduction to Programming',
          teacher: 'Dr. Rajesh Kumar',
          classroom: 'CS-101',
          type: 'Lecture'
        },
        {
          day: 'Monday',
          startTime: '10:00',
          endTime: '11:00',
          subject: 'Calculus',
          teacher: 'Prof. Priya Sharma',
          classroom: 'CS-101',
          type: 'Lecture'
        }
      ],
      isActive: true
    }
  ]
};

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [currentView, setCurrentView] = useState('dashboard');

  useEffect(() => {
    // Check if admin is already logged in (from localStorage)
    const adminToken = localStorage.getItem('adminToken');
    if (adminToken) {
      setIsAdmin(true);
    }
  }, []);

  const handleAdminLogin = (token, user) => {
    localStorage.setItem('adminToken', token);
    localStorage.setItem('adminUser', JSON.stringify(user));
    setIsAdmin(true);
    setShowAdminLogin(false);
  };

  const handleAdminLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    setIsAdmin(false);
  };

  return (
    <Router>
      <div className="flex flex-col h-screen bg-gray-50">
        {/* Admin Login Modal */}
        {showAdminLogin && (
          <AdminLogin 
            onLogin={handleAdminLogin}
            onClose={() => setShowAdminLogin(false)}
          />
        )}

        <div className="flex flex-1 overflow-hidden">
          <Sidebar 
            isAdmin={isAdmin}
            currentView={currentView}
            onViewChange={setCurrentView}
          />
          <div className="flex-1 flex flex-col overflow-hidden">
            <Header 
              isAdmin={isAdmin}
              onAdminLogout={handleAdminLogout}
            />
            <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
              <Routes>
                <Route path="/" element={
                  <Dashboard 
                    demoData={demoData}
                    isAdmin={isAdmin}
                  />
                } />
                <Route path="/teachers" element={
                  <TeacherManagement 
                    demoData={demoData}
                    isAdmin={isAdmin}
                  />
                } />
                <Route path="/classrooms" element={
                  <ClassroomManagement 
                    demoData={demoData}
                    isAdmin={isAdmin}
                  />
                } />
                <Route path="/subjects" element={
                  <SubjectManagement 
                    demoData={demoData}
                    isAdmin={isAdmin}
                  />
                } />
                <Route path="/generate" element={
                  <TimetableGenerator 
                    demoData={demoData}
                    isAdmin={isAdmin}
                  />
                } />
                <Route path="/timetable" element={
                  <TimetableView 
                    demoData={demoData}
                    isAdmin={isAdmin}
                  />
                } />
                <Route path="/teacher-routines" element={
                  <TeacherRoutines 
                    demoData={demoData}
                    isAdmin={isAdmin}
                  />
                } />
              </Routes>
            </main>
          </div>
        </div>
        
        <Footer 
          onAdminLogin={() => setShowAdminLogin(true)}
          isAdmin={isAdmin}
        />
        <Toaster position="top-right" />
      </div>
    </Router>
  );
}

export default App;