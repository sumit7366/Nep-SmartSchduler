const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
  code: {
    type: String,
    required: [true, 'Subject code is required'],
    unique: true,
    trim: true
  },
  name: {
    type: String,
    required: [true, 'Subject name is required'],
    trim: true
  },
  credits: {
    type: Number,
    required: [true, 'Credits are required'],
    min: 1,
    max: 6
  },
  type: {
    type: String,
    enum: ['Theory', 'Practical', 'Lab', 'Project', 'Skill', 'Vocational', 'Interdisciplinary'],
    default: 'Theory'
  },
  hoursPerWeek: {
    type: Number,
    required: [true, 'Hours per week are required'],
    min: 1,
    max: 20
  },
  department: {
    type: String,
    required: [true, 'Department is required']
  },
  semester: {
    type: Number,
    required: [true, 'Semester is required'],
    min: 1,
    max: 8
  },
  nepCompliant: {
    type: Boolean,
    default: false
  },
  specialRequirements: [String]
}, {
  timestamps: true
});

module.exports = mongoose.model('Subject', subjectSchema);