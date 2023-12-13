// models/coachingUser.js

const mongoose = require('mongoose');

const coachingUserSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true },
  role: {
    type: String,
    enum: ['student', 'admin', 'mentor'],
    default: 'student'
  },
  opportunities: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MentoringOpportunity'
  }]

});

const CoachingUser = mongoose.model('CoachingUser', coachingUserSchema);

module.exports = CoachingUser;
