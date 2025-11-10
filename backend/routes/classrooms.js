const express = require('express');
const router = express.Router();
const Classroom = require('../models/Classroom');

// Get all classrooms
router.get('/', async (req, res) => {
  try {
    if (req.demoMode) {
      // Use demo data from middleware
      const demoData = req.demoData || { classrooms: [] };
      
      return res.json({
        success: true,
        data: demoData.classrooms,
        count: demoData.classrooms.length,
        demoMode: true,
        message: 'Using demo data - Database not connected'
      });
    }

    const classrooms = await Classroom.find({ isActive: true }).sort({ name: 1 });
    
    res.json({
      success: true,
      data: classrooms,
      count: classrooms.length,
      demoMode: false
    });
  } catch (error) {
    console.error('Classrooms route error:', error);
    
    // Fallback to demo data
    const demoData = req.demoData || { classrooms: [] };
    
    res.json({
      success: true,
      data: demoData.classrooms,
      count: demoData.classrooms.length,
      demoMode: true,
      message: 'Using demo data due to database error'
    });
  }
});

// Create new classroom
router.post('/', async (req, res) => {
  if (req.demoMode) {
    return res.status(503).json({
      success: false,
      message: 'Database not available. Operation not allowed in demo mode.'
    });
  }
  
  try {
    const classroom = new Classroom(req.body);
    const savedClassroom = await classroom.save();
    
    res.status(201).json({
      success: true,
      message: 'Classroom created successfully',
      data: savedClassroom
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Classroom with this name already exists'
      });
    }
    
    res.status(400).json({
      success: false,
      message: 'Error creating classroom',
      error: error.message
    });
  }
});

module.exports = router;