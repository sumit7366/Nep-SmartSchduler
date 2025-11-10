const mongoose = require('mongoose');

const timetableEntrySchema = new mongoose.Schema({
  day: {
    type: String,
    enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    required: true
  },
  startTime: {
    type: String,
    required: true
  },
  endTime: {
    type: String,
    required: true
  },
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subject',
    required: true
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher',
    required: true
  },
  classroom: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Classroom',
    required: true
  },
  class: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['Lecture', 'Lab', 'Tutorial', 'Project', 'Activity'],
    default: 'Lecture'
  }
});

const timetableSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Timetable name is required'],
    trim: true
  },
  department: {
    type: String,
    required: [true, 'Department is required']
  },
  semester: {
    type: Number,
    required: [true, 'Semester is required']
  },
  academicYear: {
    type: String,
    required: [true, 'Academic year is required']
  },
  entries: [timetableEntrySchema],
  constraints: {
    maxHoursPerDay: { type: Number, default: 8 },
    includeSkillPeriods: { type: Boolean, default: true },
    includeActivityBlocks: { type: Boolean, default: true },
    includeInterdisciplinary: { type: Boolean, default: true }
  },
  isActive: {
    type: Boolean,
    default: true
  },
  generatedBy: {
    type: String,
    default: 'System'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Timetable', timetableSchema);