const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enhanced Demo Data with routines
const demoData = {
  teachers: [
    {
      _id: 'demo-teacher-1',
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
        { day: 'Wednesday', time: '14:00-16:00', subject: 'Web Development', classroom: 'Lab-B', type: 'Skill' },
        { day: 'Thursday', time: '10:00-11:00', subject: 'Data Structures', classroom: 'CS-102', type: 'Tutorial' },
        { day: 'Friday', time: '15:00-16:00', subject: 'Project Guidance', classroom: 'Seminar Hall', type: 'Project' }
      ],
      isActive: true
    },
    {
      _id: 'demo-teacher-2',
      name: 'Prof. Priya Sharma',
      email: 'priya.sharma@college.edu',
      department: 'Mathematics', 
      maxHoursPerWeek: 35,
      qualifications: ['PhD in Mathematics', 'M.Sc in Statistics'],
      subjects: ['MATH101', 'MATH102'],
      routines: [
        { day: 'Monday', time: '10:00-11:00', subject: 'Calculus', classroom: 'CS-101', type: 'Lecture' },
        { day: 'Tuesday', time: '14:00-16:00', subject: 'Mathematics Lab', classroom: 'Lab-A', type: 'Lab' },
        { day: 'Wednesday', time: '09:00-10:00', subject: 'Linear Algebra', classroom: 'CS-102', type: 'Lecture' },
        { day: 'Thursday', time: '11:00-12:00', subject: 'Calculus Tutorial', classroom: 'CS-101', type: 'Tutorial' },
        { day: 'Friday', time: '10:00-11:00', subject: 'Advanced Mathematics', classroom: 'CS-102', type: 'Lecture' }
      ],
      isActive: true
    },
    {
      _id: 'demo-teacher-3',
      name: 'Dr. Amit Patel',
      email: 'amit.patel@college.edu',
      department: 'Electronics',
      maxHoursPerWeek: 38,
      qualifications: ['PhD in Electronics', 'M.Tech in VLSI'],
      subjects: ['EC101', 'EC102', 'ECL101'],
      routines: [
        { day: 'Monday', time: '14:00-16:00', subject: 'Electronics Lab', classroom: 'Lab-A', type: 'Lab' },
        { day: 'Tuesday', time: '09:00-10:00', subject: 'Basic Electronics', classroom: 'EC-201', type: 'Lecture' },
        { day: 'Wednesday', time: '11:00-12:00', subject: 'Digital Circuits', classroom: 'EC-201', type: 'Lecture' },
        { day: 'Thursday', time: '14:00-16:00', subject: 'Circuit Design', classroom: 'Lab-B', type: 'Lab' },
        { day: 'Friday', time: '10:00-11:00', subject: 'Electronics Theory', classroom: 'EC-201', type: 'Lecture' }
      ],
      isActive: true
    },
    {
      _id: 'demo-teacher-4',
      name: 'Dr. Sunita Reddy',
      email: 'sunita.reddy@college.edu',
      department: 'Physics',
      maxHoursPerWeek: 36,
      qualifications: ['PhD in Physics', 'M.Sc in Nuclear Physics'],
      subjects: ['PHY101', 'PHYL101'],
      routines: [
        { day: 'Monday', time: '11:00-12:00', subject: 'Engineering Physics', classroom: 'PH-101', type: 'Lecture' },
        { day: 'Tuesday', time: '10:00-12:00', subject: 'Physics Lab', classroom: 'PH-101', type: 'Lab' },
        { day: 'Wednesday', time: '14:00-15:00', subject: 'Advanced Physics', classroom: 'PH-101', type: 'Lecture' },
        { day: 'Thursday', time: '09:00-11:00', subject: 'Practical Physics', classroom: 'PH-101', type: 'Lab' }
      ],
      isActive: true
    }
  ],
  classrooms: [
    {
      _id: 'demo-room-1',
      name: 'CS-101',
      capacity: 60,
      type: 'Lecture Hall',
      facilities: ['Projector', 'Whiteboard', 'AC', 'Sound System'],
      schedule: [
        { day: 'Monday', time: '09:00-10:00', subject: 'Introduction to Programming', teacher: 'Dr. Rajesh Kumar' },
        { day: 'Monday', time: '10:00-11:00', subject: 'Calculus', teacher: 'Prof. Priya Sharma' },
        { day: 'Tuesday', time: '14:00-15:00', subject: 'Physics', teacher: 'Dr. Sunita Reddy' }
      ],
      isActive: true
    },
    {
      _id: 'demo-room-2',
      name: 'CS-102',
      capacity: 45,
      type: 'Lecture Hall', 
      facilities: ['Projector', 'Whiteboard', 'AC'],
      schedule: [
        { day: 'Monday', time: '11:00-12:00', subject: 'Data Structures', teacher: 'Dr. Rajesh Kumar' },
        { day: 'Wednesday', time: '09:00-10:00', subject: 'Linear Algebra', teacher: 'Prof. Priya Sharma' }
      ],
      isActive: true
    },
    {
      _id: 'demo-room-3',
      name: 'Lab-A',
      capacity: 30,
      type: 'Lab',
      facilities: ['Computers', 'Projector', 'Network', 'Software Tools'],
      schedule: [
        { day: 'Tuesday', time: '09:00-11:00', subject: 'Programming Lab', teacher: 'Dr. Rajesh Kumar' },
        { day: 'Tuesday', time: '14:00-16:00', subject: 'Mathematics Lab', teacher: 'Prof. Priya Sharma' },
        { day: 'Monday', time: '14:00-16:00', subject: 'Electronics Lab', teacher: 'Dr. Amit Patel' }
      ],
      isActive: true
    },
    {
      _id: 'demo-room-4',
      name: 'Lab-B',
      capacity: 25,
      type: 'Lab',
      facilities: ['Computers', 'Specialized Software', 'Network'],
      schedule: [
        { day: 'Wednesday', time: '14:00-16:00', subject: 'Web Development', teacher: 'Dr. Rajesh Kumar' },
        { day: 'Thursday', time: '14:00-16:00', subject: 'Circuit Design', teacher: 'Dr. Amit Patel' }
      ],
      isActive: true
    },
    {
      _id: 'demo-room-5',
      name: 'EC-201',
      capacity: 50,
      type: 'Lecture Hall',
      facilities: ['Projector', 'Whiteboard', 'AC'],
      schedule: [
        { day: 'Tuesday', time: '09:00-10:00', subject: 'Basic Electronics', teacher: 'Dr. Amit Patel' },
        { day: 'Wednesday', time: '11:00-12:00', subject: 'Digital Circuits', teacher: 'Dr. Amit Patel' },
        { day: 'Friday', time: '10:00-11:00', subject: 'Electronics Theory', teacher: 'Dr. Amit Patel' }
      ],
      isActive: true
    },
    {
      _id: 'demo-room-6',
      name: 'PH-101',
      capacity: 40,
      type: 'Lab',
      facilities: ['Physics Equipment', 'Projector', 'Workbenches'],
      schedule: [
        { day: 'Monday', time: '11:00-12:00', subject: 'Engineering Physics', teacher: 'Dr. Sunita Reddy' },
        { day: 'Tuesday', time: '10:00-12:00', subject: 'Physics Lab', teacher: 'Dr. Sunita Reddy' },
        { day: 'Wednesday', time: '14:00-15:00', subject: 'Advanced Physics', teacher: 'Dr. Sunita Reddy' },
        { day: 'Thursday', time: '09:00-11:00', subject: 'Practical Physics', teacher: 'Dr. Sunita Reddy' }
      ],
      isActive: true
    }
  ],
  subjects: [
    {
      _id: 'demo-subject-1',
      code: 'CS101',
      name: 'Introduction to Programming',
      credits: 4,
      type: 'Theory',
      hoursPerWeek: 4,
      department: 'Computer Science',
      semester: 1,
      nepCompliant: true,
      specialRequirements: ['Computer Lab Access'],
      teachers: ['Dr. Rajesh Kumar'],
      classes: ['CS Sem 1', 'IT Sem 1']
    },
    {
      _id: 'demo-subject-2',
      code: 'CS102', 
      name: 'Data Structures and Algorithms',
      credits: 4,
      type: 'Theory',
      hoursPerWeek: 4,
      department: 'Computer Science',
      semester: 2,
      nepCompliant: true,
      specialRequirements: ['Programming Practice'],
      teachers: ['Dr. Rajesh Kumar'],
      classes: ['CS Sem 2']
    },
    {
      _id: 'demo-subject-3',
      code: 'CSS101',
      name: 'Web Development Skills',
      credits: 3,
      type: 'Skill',
      hoursPerWeek: 3,
      department: 'Computer Science',
      semester: 3,
      nepCompliant: true,
      specialRequirements: ['Internet Access', 'Development Tools'],
      teachers: ['Dr. Rajesh Kumar'],
      classes: ['CS Sem 3']
    },
    {
      _id: 'demo-subject-4',
      code: 'MATH101',
      name: 'Calculus and Geometry',
      credits: 4,
      type: 'Theory',
      hoursPerWeek: 4,
      department: 'Mathematics',
      semester: 1,
      nepCompliant: false,
      teachers: ['Prof. Priya Sharma'],
      classes: ['CS Sem 1', 'EC Sem 1']
    },
    {
      _id: 'demo-subject-5',
      code: 'MATH102',
      name: 'Linear Algebra',
      credits: 3,
      type: 'Theory',
      hoursPerWeek: 3,
      department: 'Mathematics',
      semester: 2,
      nepCompliant: false,
      teachers: ['Prof. Priya Sharma'],
      classes: ['CS Sem 2']
    },
    {
      _id: 'demo-subject-6',
      code: 'EC101',
      name: 'Basic Electronics',
      credits: 4,
      type: 'Theory',
      hoursPerWeek: 4,
      department: 'Electronics',
      semester: 1,
      nepCompliant: true,
      teachers: ['Dr. Amit Patel'],
      classes: ['EC Sem 1']
    },
    {
      _id: 'demo-subject-7',
      code: 'EC102',
      name: 'Digital Circuits',
      credits: 4,
      type: 'Theory',
      hoursPerWeek: 4,
      department: 'Electronics',
      semester: 2,
      nepCompliant: true,
      teachers: ['Dr. Amit Patel'],
      classes: ['EC Sem 2']
    },
    {
      _id: 'demo-subject-8',
      code: 'ECL101',
      name: 'Electronics Lab',
      credits: 2,
      type: 'Lab',
      hoursPerWeek: 4,
      department: 'Electronics',
      semester: 1,
      nepCompliant: true,
      specialRequirements: ['Electronic Components', 'Testing Equipment'],
      teachers: ['Dr. Amit Patel'],
      classes: ['EC Sem 1']
    },
    {
      _id: 'demo-subject-9',
      code: 'PHY101',
      name: 'Engineering Physics',
      credits: 4,
      type: 'Theory',
      hoursPerWeek: 4,
      department: 'Physics',
      semester: 1,
      nepCompliant: false,
      teachers: ['Dr. Sunita Reddy'],
      classes: ['CS Sem 1', 'EC Sem 1']
    },
    {
      _id: 'demo-subject-10',
      code: 'PHYL101',
      name: 'Physics Lab',
      credits: 2,
      type: 'Lab',
      hoursPerWeek: 4,
      department: 'Physics',
      semester: 1,
      nepCompliant: false,
      teachers: ['Dr. Sunita Reddy'],
      classes: ['CS Sem 1', 'EC Sem 1']
    }
  ],
  timetables: [
    {
      _id: 'demo-timetable-1',
      name: 'Computer Science Semester 1 Timetable',
      department: 'Computer Science',
      semester: 1,
      academicYear: '2024-25',
      entries: [
        {
          day: 'Monday',
          startTime: '09:00',
          endTime: '10:00',
          subject: { name: 'Introduction to Programming', code: 'CS101' },
          teacher: { name: 'Dr. Rajesh Kumar' },
          classroom: { name: 'CS-101' },
          class: 'CS Sem 1',
          type: 'Lecture'
        },
        {
          day: 'Monday',
          startTime: '10:00',
          endTime: '11:00', 
          subject: { name: 'Calculus and Geometry', code: 'MATH101' },
          teacher: { name: 'Prof. Priya Sharma' },
          classroom: { name: 'CS-101' },
          class: 'CS Sem 1',
          type: 'Lecture'
        },
        {
          day: 'Tuesday',
          startTime: '09:00',
          endTime: '11:00',
          subject: { name: 'Programming Lab', code: 'CSL101' },
          teacher: { name: 'Dr. Rajesh Kumar' },
          classroom: { name: 'Lab-A' },
          class: 'CS Sem 1',
          type: 'Lab'
        },
        {
          day: 'Wednesday',
          startTime: '11:00',
          endTime: '12:00',
          subject: { name: 'Engineering Physics', code: 'PHY101' },
          teacher: { name: 'Dr. Sunita Reddy' },
          classroom: { name: 'PH-101' },
          class: 'CS Sem 1',
          type: 'Lecture'
        },
        {
          day: 'Thursday',
          startTime: '14:00',
          endTime: '16:00',
          subject: { name: 'Web Development Skills', code: 'CSS101' },
          teacher: { name: 'Dr. Rajesh Kumar' },
          classroom: { name: 'Lab-B' },
          class: 'CS Sem 1',
          type: 'Skill'
        }
      ],
      isActive: true
    }
  ]
};

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'NEP SmartScheduler Backend is running',
    database: {
      mode: 'DEMO_MODE',
      connected: false
    },
    dataCounts: {
      teachers: demoData.teachers.length,
      classrooms: demoData.classrooms.length,
      subjects: demoData.subjects.length,
      timetables: demoData.timetables.length
    },
    timestamp: new Date().toISOString()
  });
});

// Teachers endpoints
app.get('/api/teachers', (req, res) => {
  console.log('GET /api/teachers - Returning demo teachers data');
  res.json({
    success: true,
    data: demoData.teachers,
    count: demoData.teachers.length,
    demoMode: true,
    message: 'Using demo data'
  });
});

app.post('/api/teachers', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Teacher created successfully (demo mode)',
    data: {
      ...req.body,
      _id: 'new-teacher-' + Date.now(),
      isActive: true
    }
  });
});

// Classrooms endpoints
app.get('/api/classrooms', (req, res) => {
  console.log('GET /api/classrooms - Returning demo classrooms data');
  res.json({
    success: true,
    data: demoData.classrooms,
    count: demoData.classrooms.length,
    demoMode: true,
    message: 'Using demo data'
  });
});

app.post('/api/classrooms', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Classroom created successfully (demo mode)',
    data: {
      ...req.body,
      _id: 'new-classroom-' + Date.now(),
      isActive: true
    }
  });
});

// Subjects endpoints
app.get('/api/subjects', (req, res) => {
  console.log('GET /api/subjects - Returning demo subjects data');
  const { department, semester, type } = req.query;
  let filteredSubjects = demoData.subjects;

  if (department) {
    filteredSubjects = filteredSubjects.filter(subject => 
      subject.department === department
    );
  }
  if (semester) {
    filteredSubjects = filteredSubjects.filter(subject => 
      subject.semester == semester
    );
  }
  if (type) {
    filteredSubjects = filteredSubjects.filter(subject => 
      subject.type === type
    );
  }

  res.json({
    success: true,
    data: filteredSubjects,
    count: filteredSubjects.length,
    demoMode: true,
    message: 'Using demo data'
  });
});

app.post('/api/subjects', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Subject created successfully (demo mode)',
    data: {
      ...req.body,
      _id: 'new-subject-' + Date.now(),
      isActive: true
    }
  });
});

// Timetable endpoints
app.get('/api/timetable', (req, res) => {
  console.log('GET /api/timetable - Returning demo timetables data');
  res.json({
    success: true,
    data: demoData.timetables,
    count: demoData.timetables.length,
    demoMode: true,
    message: 'Using demo data'
  });
});

app.post('/api/timetable/generate', (req, res) => {
  const { department, semester, academicYear } = req.body;
  
  const newTimetable = {
    _id: 'new-timetable-' + Date.now(),
    name: `${department} Semester ${semester} Timetable`,
    department,
    semester,
    academicYear: academicYear || '2024-25',
    entries: demoData.timetables[0].entries,
    isActive: true,
    generatedBy: 'AI Scheduler',
    createdAt: new Date().toISOString()
  };

  res.status(201).json({
    success: true,
    message: 'Timetable generated successfully (demo mode)',
    data: newTimetable
  });
});

// AI Assistant endpoint
app.post('/api/ai/assistant', (req, res) => {
  const { message } = req.body;
  
  let response = "Hello! I'm your NEP SmartScheduler AI assistant. I can help you with timetable generation, NEP 2020 compliance, and resource management. How can I assist you today?";

  if (message.toLowerCase().includes('timetable')) {
    response = "I can help generate optimized timetables based on NEP 2020 guidelines. Would you like me to create a new timetable or modify an existing one?";
  } else if (message.toLowerCase().includes('nep')) {
    response = "NEP 2020 emphasizes skill development, interdisciplinary learning, and flexible scheduling. I ensure your timetable includes skill periods, activity blocks, and balanced workload distribution.";
  } else if (message.toLowerCase().includes('teacher')) {
    response = "I can help manage teacher allocations while considering their availability, subject expertise, and maximum weekly hours to prevent overload.";
  } else if (message.toLowerCase().includes('classroom')) {
    response = "I optimize classroom allocation based on capacity, facility requirements, and availability to ensure efficient space utilization.";
  }

  res.json({
    success: true,
    data: {
      message: response,
      timestamp: new Date().toISOString()
    }
  });
});

// Admin endpoints
app.get('/api/admin/database/status', (req, res) => {
  res.json({
    success: true,
    data: {
      demoMode: true,
      isConnected: false,
      mongodbUri: 'mongodb://localhost:27017/nep_smartscheduler',
      forceDemo: true,
      useDemoData: true
    },
    message: 'Current mode: DEMO'
  });
});

app.post('/api/admin/database/demo-mode', (req, res) => {
  res.json({
    success: true,
    message: 'Already in DEMO MODE',
    data: {
      demoMode: true,
      isConnected: false
    }
  });
});

app.post('/api/admin/database/mongodb-mode', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Switched to MongoDB mode (simulated)',
    data: {
      demoMode: false,
      isConnected: true
    }
  });
});

// Admin Login
app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body;

  if (username === 'admin' && password === 'admin123') {
    const token = 'admin-token-' + Date.now();
    
    res.json({
      success: true,
      message: 'Login successful',
      data: {
        token,
        user: {
          username: 'admin',
          email: 'admin@nepscheduler.edu',
          role: 'admin'
        }
      }
    });
  } else {
    res.status(401).json({
      success: false,
      message: 'Invalid credentials'
    });
  }
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found: ' + req.originalUrl
  });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`🚀 Backend Server running on port ${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV}`);
  console.log(`🗄️  Database Mode: DEMO`);
  console.log(`🌐 Health check: http://localhost:${PORT}/api/health`);
  console.log(`🎯 Demo data loaded:`);
  console.log(`   👨‍🏫 ${demoData.teachers.length} Teachers`);
  console.log(`   🏫 ${demoData.classrooms.length} Classrooms`);
  console.log(`   📚 ${demoData.subjects.length} Subjects`);
  console.log(`   📅 ${demoData.timetables.length} Timetables`);
  console.log(`\n📝 Available Routes:`);
  console.log(`   GET  /api/health`);
  console.log(`   GET  /api/teachers`);
  console.log(`   GET  /api/classrooms`);
  console.log(`   GET  /api/subjects`);
  console.log(`   GET  /api/timetable`);
  console.log(`   POST /api/admin/login`);
});