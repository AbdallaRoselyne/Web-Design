// studentController.js

const CoachingUser = require('../models/coachingUser');
const Mentor = require('../models/mentor');
const MentoringOpportunity = require('../models/mentoringOpportunity');

exports.dashboard_get = async (req, res) => {
  try {

    const opportunities = await MentoringOpportunity.find().lean();

    res.render('students/dashboard', {
      title: 'Student Dashboard',
      opportunities: opportunities
    });
  } catch (error) {
    console.error('Error rendering student dashboard: ', error);
    res.status(500).send('Error rendering dashboard');
  }
};

exports.careerAdvice_get = async (req, res) => {
  try {
    const careerAdviceOpportunities = await MentoringOpportunity.find({ category: 'Career_advice' }).lean();
    res.render('students/career_advice', {
      title: 'Career Advice Opportunities',
      user: req.user,
      careerAdviceOpportunities: careerAdviceOpportunities
    });
  } catch (error) {
    console.error('Error rendering career advice page: ', error);
    res.status(500).send('Error rendering career advice page');
  }
};

exports.resumeReview_get = async (req, res) => {
  try {
    const resumeReviewOpportunities = await MentoringOpportunity.find({ category: 'Resume_Review' }).lean();
    res.render('students/resume_review', {
      title: 'Resume Review Opportunities',
      user: req.user,
      resumeReviewOpportunities: resumeReviewOpportunities
    });
  } catch (error) {
    console.error('Error rendering resume review page: ', error);
    res.status(500).send('Error rendering resume review page');
  }
};


exports.mockInterview_get = async (req, res) => {
  try {
    const mockInterviewOpportunities = await MentoringOpportunity.find({ category: 'Mock_Interview' }).lean();
    res.render('students/mock_interview', {
      title: 'Mock Interview Opportunities',
      user: req.user,
      mockInterviewOpportunities: mockInterviewOpportunities
    });
  } catch (error) {
    console.error('Error rendering mock interview page: ', error);
    res.status(500).send('Error rendering mock interview page');
  }
};



exports.joinOpportunity = async (req, res) => {
  const userId = req.user._id;
  const opportunityId = req.params.opportunityId;

  try {
    const result = await CoachingUser.findByIdAndUpdate(
      userId,
      { $addToSet: { opportunities: opportunityId } },
      { new: true }
    );

    if (result) {
      res.json({ message: 'You have successfully joined the opportunity!' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error joining opportunity', error: error });
  }
};

exports.leaveOpportunity = async (req, res) => {
  const userId = req.user._id;
  const opportunityId = req.params.opportunityId;

  try {
    const result = await CoachingUser.findByIdAndUpdate(
      userId,
      { $pull: { opportunities: opportunityId } },
      { new: true }
    );

    if (result) {
      res.json({ message: 'You have successfully left the opportunity.' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error leaving opportunity', error: error });
  }
};

exports.myOpportunities_get = async (req, res) => {
  try {
    const user = await CoachingUser.findById(req.user._id).populate('opportunities').exec();
    res.render('students/my_opportunities', {
      title: 'My Opportunities',
      opportunities: user.opportunities
    });
  } catch (error) {
    console.error('Error rendering my opportunities page: ', error);
    res.status(500).send('Error rendering my opportunities page');
  }
};

exports.get_mentors = async (req, res) => {
  try {
    const mentors = await Mentor.find().lean();
    res.render('students/mentors', {
      title: 'Mentors',
      mentors: mentors
    });
  } catch (error) {
    console.error('Error rendering mentors page: ', error);
    res.status(500).send('Error rendering mentors page');
  }
};