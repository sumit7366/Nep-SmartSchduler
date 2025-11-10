const express = require('express');
const router = express.Router();
const Subject = require('../models/Subject');

// Get all subjects
router.get('/', async (req, res) => {
  try {
    const { department, semester, type } = req.query;
    
    if (req.demoMode) {
      const demoData = req.demoData || { subjects: [] };
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
      
      return res.json({
        success: true,
        data: filteredSubjects,
        count: filteredSubjects.length,
        demoMode: true,
        message: 'Using demo data - Database not connected'
      });
    }

    let filter = { isActive: true };
    if (department) filter.department = department;
    if (semester) filter.semester = semester;
    if (type) filter.type = type;
    
    const subjects = await Subject.find(filter).sort({ code: 1 });
    
    res.json({
      success: true,
      data: subjects,
      count: subjects.length,
      demoMode: false
    });
  } catch (error) {
    console.error('Subjects route error:', error);
    
    const demoData = req.demoData || { subjects: [] };
    
    res.json({
      success: true,
      data: demoData.subjects,
      count: demoData.subjects.length,
      demoMode: true,
      message: 'Using demo data due to database error'
    });
  }
});

// Create new subject
router.post('/', async (req, res) => {
  if (req.demoMode) {
    return res.status(503).json({
      success: false,
      message: 'Database not available. Operation not allowed in demo mode.'
    });
  }
  
  try {
    const subject = new Subject(req.body);
    const savedSubject = await subject.save();
    
    res.status(201).json({
      success: true,
      message: 'Subject created successfully',
      data: savedSubject
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Subject with this code already exists'
      });
    }
    
    res.status(400).json({
      success: false,
      message: 'Error creating subject',
      error: error.message
    });
  }
});

module.exports = router;