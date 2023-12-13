// routes/adminRoutes.js

const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Admin dashboard
router.get('/dashboard', adminController.admin_dashboard);

// Student records management
;
router.get('/students', adminController.list_students);
router.get('/student/new', adminController.new_student);
router.get('/student/:id', adminController.get_student);
router.put('/student/:id/update', adminController.update_student);

router.get('/student/:id/edit', adminController.edit_student_get);
router.post('/student/add', adminController.create_student);
router.delete('/students/:id/delete', adminController.delete_student);

// List all mentors
router.get('/mentors', adminController.list_mentors);

// Display form to add a new mentor
router.get('/mentor/new', adminController.new_mentor);

// Process form and add a new mentor
router.post('/mentors/add', adminController.create_mentor);


// Display a specific mentor's details
router.get('/mentor/:id', adminController.get_mentor);

// Display form to edit a mentor
router.get('/mentor/:id/edit', adminController.edit_mentor_get);

// Update a mentor's details 
router.put('/mentor/:id/update', adminController.update_mentor);

// Delete a mentor
router.delete('/mentor/:id/delete', adminController.delete_mentor);
// Route to handle submission of new opportunity form

router.post('/opportunity_create/create_new', adminController.create_opportunity);
// Display all mentoring opportunities
router.get('/opportunities', adminController.display_opportunities);

// Route to display the form to add a new opportunity
router.get('/opportunity/new', adminController.new_opportunity_get);

// Send to edit form for a specific mentoring opportunity
router.get('/opportunity/:id/edit', adminController.edit_opportunity);

// Update a specific mentoring opportunity
router.put('/opportunity/:id/update', adminController.update_opportunity);

// Delete a specific mentoring opportunity
router.delete('/opportunities/:id/delete', adminController.delete_opportunity);




module.exports = router;
