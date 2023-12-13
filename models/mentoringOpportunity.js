const mongoose = require('mongoose');

const mentoringOpportunitySchema = new mongoose.Schema({
  category: {
    type: String,
    enum: ['Career_advice', 'Resume_Review', 'Mock_Interview'],
    required: [true, 'Category is required'],
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
  },
  mentor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Mentor',
    required: [true, 'A mentor must be assigned to the opportunity'],
  },
  date: {
    type: Date,
    required: [true, 'Date of the mentoring session is required'],
  },
  status: {
    type: String,
    enum: ['Open', 'Closed'],
    default: 'Open',
  }
}, { timestamps: true });

module.exports = mongoose.model('MentoringOpportunity', mentoringOpportunitySchema);
