const mongoose = require('mongoose');

const classroomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Classroom name is required'],
    unique: true,
    trim: true
  },
  capacity: {
    type: Number,
    required: [true, 'Capacity is required'],
    min: 10
  },
  type: {
    type: String,
    enum: ['Lecture Hall', 'Lab', 'Seminar Room', 'Workshop'],
    default: 'Lecture Hall'
  },
  facilities: [String],
  availability: [{
    day: {
      type: String,
      enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    },
    slots: [{
      start: String,
      end: String
    }]
  }],
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Classroom', classroomSchema);