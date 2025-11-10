const express = require('express');
const router = express.Router();
const Teacher = require('../models/Teacher');

// Get all teachers
router.get('/', async (req, res) => {
  try {
    if (req.demoMode) {
      // Ensure demoData exists
      const demoData = req.demoData || {
        teachers: [
          {
            _id: 'demo-teacher-1',
            name: 'Dr. Rajesh Kumar',
            email: 'rajesh.kumar@college.edu',
            department: 'Computer Science',
            maxHoursPerWeek: 40,
            isActive: true
          }
        ]
      };
      
      return res.json({
        success: true,
        data: demoData.teachers,
        count: demoData.teachers.length,
        demoMode: true,
        message: 'Using demo data - Database not connected'
      });
    }

    const teachers = await Teacher.find({ isActive: true })
      .populate('subjects')
      .sort({ name: 1 });
    
    res.json({
      success: true,
      data: teachers,
      count: teachers.length,
      demoMode: false
    });
  } catch (error) {
    console.error('Teachers route error:', error);
    // Fallback to basic demo data on error
    const fallbackData = {
      teachers: [
        {
          _id: 'fallback-teacher-1',
          name: 'Demo Teacher',
          email: 'demo@college.edu',
          department: 'Computer Science',
          maxHoursPerWeek: 40,
          isActive: true
        }
      ]
    };
    
    res.json({
      success: true,
      data: fallbackData.teachers,
      count: fallbackData.teachers.length,
      demoMode: true,
      message: 'Using fallback data due to database error'
    });
  }
});

// Get teacher by ID
router.get('/:id', async (req, res) => {
  try {
    if (req.demoMode) {
      const demoData = req.demoData || { teachers: [] };
      const teacher = demoData.teachers.find(t => t._id === req.params.id);
      
      if (!teacher) {
        return res.status(404).json({
          success: false,
          message: 'Teacher not found in demo data'
        });
      }
      
      return res.json({
        success: true,
        data: teacher,
        demoMode: true
      });
    }

    const teacher = await Teacher.findById(req.params.id).populate('subjects');
    
    if (!teacher) {
      return res.status(404).json({
        success: false,
        message: 'Teacher not found'
      });
    }
    
    res.json({
      success: true,
      data: teacher
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching teacher',
      error: error.message
    });
  }
});

// Create new teacher
router.post('/', async (req, res) => {
  if (req.demoMode) {
    return res.status(503).json({
      success: false,
      message: 'Database not available. Operation not allowed in demo mode.'
    });
  }
  
  try {
    const teacher = new Teacher(req.body);
    const savedTeacher = await teacher.save();
    
    res.status(201).json({
      success: true,
      message: 'Teacher created successfully',
      data: savedTeacher
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Teacher with this email already exists'
      });
    }
    
    res.status(400).json({
      success: false,
      message: 'Error creating teacher',
      error: error.message
    });
  }
});

// Update teacher
router.put('/:id', async (req, res) => {
  if (req.demoMode) {
    return res.status(503).json({
      success: false,
      message: 'Database not available. Operation not allowed in demo mode.'
    });
  }

  try {
    const teacher = await Teacher.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('subjects');
    
    if (!teacher) {
      return res.status(404).json({
        success: false,
        message: 'Teacher not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Teacher updated successfully',
      data: teacher
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating teacher',
      error: error.message
    });
  }
});

// Delete teacher (soft delete)
router.delete('/:id', async (req, res) => {
  if (req.demoMode) {
    return res.status(503).json({
      success: false,
      message: 'Database not available. Operation not allowed in demo mode.'
    });
  }

  try {
    const teacher = await Teacher.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );
    
    if (!teacher) {
      return res.status(404).json({
        success: false,
        message: 'Teacher not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Teacher deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting teacher',
      error: error.message
    });
  }
});

module.exports = router;