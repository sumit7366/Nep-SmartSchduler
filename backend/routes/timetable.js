const express = require('express');
const router = express.Router();
const Timetable = require('../models/Timetable');

// Get all timetables
router.get('/', async (req, res) => {
  try {
    const { department, semester } = req.query;
    
    if (req.demoMode) {
      const demoData = req.demoData || { timetables: [] };
      let filteredTimetables = demoData.timetables;
      
      if (department) {
        filteredTimetables = filteredTimetables.filter(timetable => 
          timetable.department === department
        );
      }
      if (semester) {
        filteredTimetables = filteredTimetables.filter(timetable => 
          timetable.semester == semester
        );
      }
      
      return res.json({
        success: true,
        data: filteredTimetables,
        count: filteredTimetables.length,
        demoMode: true,
        message: 'Using demo data - Database not connected'
      });
    }

    let filter = { isActive: true };
    if (department) filter.department = department;
    if (semester) filter.semester = semester;
    
    const timetables = await Timetable.find(filter)
      .populate('entries.subject')
      .populate('entries.teacher')
      .populate('entries.classroom')
      .sort({ createdAt: -1 });
    
    res.json({
      success: true,
      data: timetables,
      count: timetables.length,
      demoMode: false
    });
  } catch (error) {
    console.error('Timetable route error:', error);
    
    const demoData = req.demoData || { timetables: [] };
    
    res.json({
      success: true,
      data: demoData.timetables,
      count: demoData.timetables.length,
      demoMode: true,
      message: 'Using demo data due to database error'
    });
  }
});

// Generate new timetable
router.post('/generate', async (req, res) => {
  if (req.demoMode) {
    return res.status(503).json({
      success: false,
      message: 'Database not available. Operation not allowed in demo mode.'
    });
  }

  try {
    const { department, semester, academicYear, constraints } = req.body;
    
    // Simple scheduling algorithm (replace with actual constraint solver)
    const generatedTimetable = await generateTimetable({
      department,
      semester,
      academicYear,
      constraints
    });
    
    const timetable = new Timetable(generatedTimetable);
    const savedTimetable = await timetable.save();
    
    await savedTimetable.populate('entries.subject entries.teacher entries.classroom');
    
    res.status(201).json({
      success: true,
      message: 'Timetable generated successfully',
      data: savedTimetable
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error generating timetable',
      error: error.message
    });
  }
});

// Simple timetable generator (placeholder - implement actual algorithm)
async function generateTimetable(params) {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const timeSlots = [
    { start: '09:00', end: '10:00' },
    { start: '10:00', end: '11:00' },
    { start: '11:15', end: '12:15' },
    { start: '12:15', end: '13:15' },
    { start: '14:00', end: '15:00' },
    { start: '15:00', end: '16:00' }
  ];
  
  const entries = [];
  
  // Generate sample entries
  days.forEach(day => {
    timeSlots.forEach(slot => {
      entries.push({
        day,
        startTime: slot.start,
        endTime: slot.end,
        subject: null,
        teacher: null,
        classroom: null,
        class: `${params.department} Sem ${params.semester}`,
        type: 'Lecture'
      });
    });
  });
  
  return {
    name: `${params.department} Sem ${params.semester} Timetable`,
    department: params.department,
    semester: params.semester,
    academicYear: params.academicYear,
    entries,
    constraints: params.constraints || {},
    generatedBy: 'AI Scheduler'
  };
}

module.exports = router;