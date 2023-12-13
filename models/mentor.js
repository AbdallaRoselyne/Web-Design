const mongoose = require('mongoose');

const mentorSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, 
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
  },
  expertise: {
    type: String,
    enum: ['Career_advice', 'Resume_Review', 'Mock_Interview'],
    required: true,
  },
  bio: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model('Mentor', mentorSchema);
