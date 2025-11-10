const Teacher = require('../models/Teacher');
const Classroom = require('../models/Classroom');
const Subject = require('../models/Subject');

const insertSampleData = async () => {
  try {
    const teacherCount = await Teacher.countDocuments();
    if (teacherCount > 0) {
      console.log('✅ Sample data already exists in database');
      return;
    }

    console.log('📥 Inserting sample data into MongoDB...');

    // Insert sample data (same structure as before but using models)
    const teachers = await Teacher.insertMany([
      {
        name: 'Dr. Rajesh Kumar',
        email: 'rajesh.kumar@college.edu',
        department: 'Computer Science',
        maxHoursPerWeek: 40,
        qualifications: ['PhD in Computer Science', 'M.Tech in AI'],
        availability: [
          { day: 'Monday', slots: [{ start: '09:00', end: '17:00' }] },
          { day: 'Tuesday', slots: [{ start: '09:00', end: '17:00' }] },
          { day: 'Wednesday', slots: [{ start: '09:00', end: '17:00' }] },
          { day: 'Thursday', slots: [{ start: '09:00', end: '17:00' }] },
          { day: 'Friday', slots: [{ start: '09:00', end: '17:00' }] }
        ]
      },
      // ... (all other sample teachers)
    ]);

    const classrooms = await Classroom.insertMany([
      {
        name: 'CS-101',
        capacity: 60,
        type: 'Lecture Hall',
        facilities: ['Projector', 'Whiteboard', 'AC', 'Sound System']
      },
      // ... (all other sample classrooms)
    ]);

    const subjects = await Subject.insertMany([
      {
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
      // ... (all other sample subjects)
    ]);

    console.log('✅ Sample data inserted successfully into MongoDB');
    console.log(`   👨‍🏫 ${teachers.length} Teachers`);
    console.log(`   🏫 ${classrooms.length} Classrooms`);
    console.log(`   📚 ${subjects.length} Subjects`);

  } catch (error) {
    console.error('❌ Error inserting sample data:', error);
  }
};

module.exports = insertSampleData;