// Complete demo data
const getDemoData = () => ({
  teachers: [
    {
      _id: 'demo-teacher-1',
      name: 'Dr. Rajesh Kumar',
      email: 'rajesh.kumar@college.edu',
      department: 'Computer Science',
      maxHoursPerWeek: 40,
      qualifications: ['PhD in Computer Science', 'M.Tech in AI'],
      subjects: [
        { _id: 'demo-subject-1', name: 'Introduction to Programming', code: 'CS101' },
        { _id: 'demo-subject-2', name: 'Data Structures', code: 'CS102' },
        { _id: 'demo-subject-6', name: 'Web Development Skills', code: 'CSS101' }
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
      subjects: [
        { _id: 'demo-subject-7', name: 'Calculus and Geometry', code: 'MATH101' },
        { _id: 'demo-subject-8', name: 'Linear Algebra', code: 'MATH102' }
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
      subjects: [
        { _id: 'demo-subject-9', name: 'Basic Electronics', code: 'EC101' },
        { _id: 'demo-subject-10', name: 'Digital Circuits', code: 'EC102' },
        { _id: 'demo-subject-11', name: 'Electronics Lab', code: 'ECL101' }
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
      subjects: [
        { _id: 'demo-subject-12', name: 'Engineering Physics', code: 'PHY101' },
        { _id: 'demo-subject-13', name: 'Physics Lab', code: 'PHYL101' }
      ],
      isActive: true
    },
    {
      _id: 'demo-teacher-5',
      name: 'Prof. Ravi Verma',
      email: 'ravi.verma@college.edu',
      department: 'Chemistry',
      maxHoursPerWeek: 34,
      qualifications: ['PhD in Chemistry', 'M.Sc in Organic Chemistry'],
      subjects: [
        { _id: 'demo-subject-14', name: 'Engineering Chemistry', code: 'CHE101' },
        { _id: 'demo-subject-15', name: 'Chemistry Lab', code: 'CHEL101' }
      ],
      isActive: true
    },
    {
      _id: 'demo-teacher-6',
      name: 'Dr. Anjali Mehta',
      email: 'anjali.mehta@college.edu',
      department: 'Computer Science',
      maxHoursPerWeek: 32,
      qualifications: ['PhD in Data Science', 'M.Tech in Machine Learning'],
      subjects: [
        { _id: 'demo-subject-3', name: 'Object Oriented Programming', code: 'CS103' },
        { _id: 'demo-subject-4', name: 'Database Management Systems', code: 'CS104' },
        { _id: 'demo-subject-16', name: 'Interdisciplinary Mathematics', code: 'ID101' },
        { _id: 'demo-subject-17', name: 'Mobile App Development', code: 'VOC101' }
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
      isActive: true
    },
    {
      _id: 'demo-room-2',
      name: 'CS-102',
      capacity: 45,
      type: 'Lecture Hall', 
      facilities: ['Projector', 'Whiteboard', 'AC'],
      isActive: true
    },
    {
      _id: 'demo-room-3',
      name: 'Lab-A',
      capacity: 30,
      type: 'Lab',
      facilities: ['Computers', 'Projector', 'Network', 'Software Tools'],
      isActive: true
    },
    {
      _id: 'demo-room-4',
      name: 'Lab-B',
      capacity: 25,
      type: 'Lab',
      facilities: ['Computers', 'Specialized Software', 'Network'],
      isActive: true
    },
    {
      _id: 'demo-room-5',
      name: 'EC-201',
      capacity: 50,
      type: 'Lecture Hall',
      facilities: ['Projector', 'Whiteboard', 'AC'],
      isActive: true
    },
    {
      _id: 'demo-room-6',
      name: 'PH-101',
      capacity: 40,
      type: 'Lab',
      facilities: ['Physics Equipment', 'Projector', 'Workbenches'],
      isActive: true
    },
    {
      _id: 'demo-room-7',
      name: 'CH-101',
      capacity: 35,
      type: 'Lab',
      facilities: ['Chemistry Equipment', 'Fume Hood', 'Safety Gear'],
      isActive: true
    },
    {
      _id: 'demo-room-8',
      name: 'Seminar Hall',
      capacity: 100,
      type: 'Seminar Room',
      facilities: ['Large Projector', 'Stage', 'Mic System', 'AC'],
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
      specialRequirements: ['Computer Lab Access']
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
      specialRequirements: ['Programming Practice']
    },
    {
      _id: 'demo-subject-3',
      code: 'CS103',
      name: 'Object Oriented Programming',
      credits: 3,
      type: 'Theory', 
      hoursPerWeek: 3,
      department: 'Computer Science',
      semester: 3,
      nepCompliant: true
    },
    {
      _id: 'demo-subject-4',
      code: 'CS104',
      name: 'Database Management Systems',
      credits: 4,
      type: 'Theory',
      hoursPerWeek: 4,
      department: 'Computer Science',
      semester: 4,
      nepCompliant: true
    },
    {
      _id: 'demo-subject-5',
      code: 'CSL101',
      name: 'Programming Lab',
      credits: 2,
      type: 'Lab',
      hoursPerWeek: 4,
      department: 'Computer Science',
      semester: 1,
      nepCompliant: true,
      specialRequirements: ['Computer Lab', 'Software Installation']
    },
    {
      _id: 'demo-subject-6',
      code: 'CSS101',
      name: 'Web Development Skills',
      credits: 3,
      type: 'Skill',
      hoursPerWeek: 3,
      department: 'Computer Science',
      semester: 3,
      nepCompliant: true,
      specialRequirements: ['Internet Access', 'Development Tools']
    },
    {
      _id: 'demo-subject-7',
      code: 'MATH101',
      name: 'Calculus and Geometry',
      credits: 4,
      type: 'Theory',
      hoursPerWeek: 4,
      department: 'Mathematics',
      semester: 1,
      nepCompliant: false
    },
    {
      _id: 'demo-subject-8',
      code: 'MATH102',
      name: 'Linear Algebra',
      credits: 3,
      type: 'Theory',
      hoursPerWeek: 3,
      department: 'Mathematics',
      semester: 2,
      nepCompliant: false
    },
    {
      _id: 'demo-subject-9',
      code: 'EC101',
      name: 'Basic Electronics',
      credits: 4,
      type: 'Theory',
      hoursPerWeek: 4,
      department: 'Electronics',
      semester: 1,
      nepCompliant: true
    },
    {
      _id: 'demo-subject-10',
      code: 'EC102',
      name: 'Digital Circuits',
      credits: 4,
      type: 'Theory',
      hoursPerWeek: 4,
      department: 'Electronics',
      semester: 2,
      nepCompliant: true
    },
    {
      _id: 'demo-subject-11',
      code: 'ECL101',
      name: 'Electronics Lab',
      credits: 2,
      type: 'Lab',
      hoursPerWeek: 4,
      department: 'Electronics',
      semester: 1,
      nepCompliant: true,
      specialRequirements: ['Electronic Components', 'Testing Equipment']
    },
    {
      _id: 'demo-subject-12',
      code: 'PHY101',
      name: 'Engineering Physics',
      credits: 4,
      type: 'Theory',
      hoursPerWeek: 4,
      department: 'Physics',
      semester: 1,
      nepCompliant: false
    },
    {
      _id: 'demo-subject-13',
      code: 'PHYL101',
      name: 'Physics Lab',
      credits: 2,
      type: 'Lab',
      hoursPerWeek: 4,
      department: 'Physics',
      semester: 1,
      nepCompliant: false
    },
    {
      _id: 'demo-subject-14',
      code: 'CHE101',
      name: 'Engineering Chemistry',
      credits: 4,
      type: 'Theory',
      hoursPerWeek: 4,
      department: 'Chemistry',
      semester: 1,
      nepCompliant: false
    },
    {
      _id: 'demo-subject-15',
      code: 'CHEL101',
      name: 'Chemistry Lab',
      credits: 2,
      type: 'Lab',
      hoursPerWeek: 4,
      department: 'Chemistry',
      semester: 1,
      nepCompliant: false
    },
    {
      _id: 'demo-subject-16',
      code: 'ID101',
      name: 'Interdisciplinary Mathematics for CS',
      credits: 3,
      type: 'Interdisciplinary',
      hoursPerWeek: 3,
      department: 'Computer Science',
      semester: 3,
      nepCompliant: true,
      specialRequirements: ['Cross-disciplinary Approach']
    },
    {
      _id: 'demo-subject-17',
      code: 'VOC101',
      name: 'Mobile App Development',
      credits: 3,
      type: 'Vocational',
      hoursPerWeek: 3,
      department: 'Computer Science',
      semester: 4,
      nepCompliant: true,
      specialRequirements: ['Android Studio', 'Mobile Devices']
    },
    {
      _id: 'demo-subject-18',
      code: 'PROJ101',
      name: 'Final Year Project',
      credits: 6,
      type: 'Project',
      hoursPerWeek: 8,
      department: 'Computer Science',
      semester: 8,
      nepCompliant: true,
      specialRequirements: ['Project Guidance', 'Presentation']
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
          startTime: '11:15',
          endTime: '12:15',
          subject: { name: 'Engineering Physics', code: 'PHY101' },
          teacher: { name: 'Dr. Sunita Reddy' },
          classroom: { name: 'CS-101' },
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
        },
        {
          day: 'Friday',
          startTime: '10:00',
          endTime: '11:00',
          subject: { name: 'Interdisciplinary Mathematics', code: 'ID101' },
          teacher: { name: 'Dr. Anjali Mehta' },
          classroom: { name: 'CS-102' },
          class: 'CS Sem 1', 
          type: 'Interdisciplinary'
        }
      ],
      isActive: true
    },
    {
      _id: 'demo-timetable-2',
      name: 'Electronics Semester 1 Timetable',
      department: 'Electronics',
      semester: 1,
      academicYear: '2024-25',
      entries: [
        {
          day: 'Monday',
          startTime: '09:00',
          endTime: '10:00',
          subject: { name: 'Basic Electronics', code: 'EC101' },
          teacher: { name: 'Dr. Amit Patel' },
          classroom: { name: 'EC-201' },
          class: 'EC Sem 1',
          type: 'Lecture'
        },
        {
          day: 'Tuesday',
          startTime: '14:00',
          endTime: '16:00',
          subject: { name: 'Electronics Lab', code: 'ECL101' },
          teacher: { name: 'Dr. Amit Patel' },
          classroom: { name: 'Lab-A' },
          class: 'EC Sem 1',
          type: 'Lab'
        }
      ],
      isActive: true
    }
  ]
});

module.exports = { getDemoData };