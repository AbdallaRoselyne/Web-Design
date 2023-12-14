Career Coaching Platform Documentation
Introduction
The Career Coaching Platform is a web application designed to connect students with mentors and 
coaches for career development assistance. It provides various services such as career advice, resume 
reviews, and mock interviews.
Project Structure
The project follows the MVC (Model-View-Controller) architecture and is built using Node.js with 
Express.js as the server framework. Mustache is used as the templating engine for rendering views. 
Passport.js is implemented for authentication, and MongoDB is used as the database.
Directories and Files Overview
• config/: Contains configuration files, such as Passport.js authentication setup.
• controllers/: Holds the controller files that handle the request-response cycle.
• middleware/: Includes middleware functions for authentication and role-based access control.
• models/: Contains Mongoose schema definitions for the application data models.
• routes/: Defines the various routes of the application, segregating them into modules like auth, 
user, admin, etc.
• views/: Stores Mustache templates for rendering the user interface.
• node_modules/: Contains all the npm packages.
• .env: A file to hold environment variables (should be kept private).
• index.js: The entry point of the application.
Views
The application uses Mustache as the templating engine. Templates are located under the views
directory.
• views/admin/ - Templates for admin-related views.
• views/students/ - Templates for student-related views.
Routes
• /admin - Routes for admin functionalities.
• /student - Routes for student functionalities.
• /auth - Authentication routes like login and signup.
• / - General routes including the about pages.
Setup and Configuration
Requirements
• Node.js
• npm (Node package manager)
• MongoDB
Installation
2. Run npm install to install the required dependencies.
3. Create a .env file with the following environment variables:
index.js Documentation
Overview
index.js is the main server file for the Career Coaching Platform. It sets up the server, configures 
middleware, establishes a connection to MongoDB, initializes the passport for authentication, and 
defines the routing for the application.
Dependencies
• express: The framework used to create the HTTP server.
• express-session: Middleware for handling sessions.
• mongoose: ODM for MongoDB.
• mustache-express: Templating engine to render mustache templates.
• dotenv: Module to load environment variables from .env file.
• passport: Authentication middleware for Node.js.
• connect-flash: Provides flash messages for passport.
Server Initialization
1. Express Application Created: An instance of express is created to set up the middleware and 
routes.
Configuration and Middleware
2. Environment Variables: Environment variables are loaded using dotenv.
3. Port: The port for the server is set based on the environment variable or defaults to 3000.
4. MongoDB Connection: Mongoose is used to connect to MongoDB. The URI is obtained from an 
environment variable or a default string (note: the default string should be replaced with a 
secure method of storing credentials).
5. Mustache View Engine: Mustache is configured as the templating engine for views.
6. Body Parsing Middleware: Set up to parse JSON and urlencoded data from the request body.
7. Session Middleware: Configured with a secret for signing the session ID cookie.
8. Flash Messages: Initialized to allow passing temporary messages to the views.
9. Passport Initialization: Passport is initialized along with its session handling capabilities.
Routes
10. Routes Importation: Route handlers are imported for different parts of the application.
11. Admin Routes: Prefixed with /admin, these handle administrative functionalities.
12. Student Routes: Prefixed with /student, these are for student-specific features.
13. Authentication Routes: Prefixed with /auth, these deal with authentication processes.
14. User Routes: Prefixed with /user, these handle user profile related routes.
15. General Routes: Serve general pages like the home and about pages.
Server Start
15. Listen: The application starts listening for requests on the specified PORT.
Usage
To start the server:
1. Ensure all environment variables are set in .env file, PORT and MONGODB_URI.
2. Run node index.js
Models Documentation Summary
The Career Coaching Platform uses MongoDB as its data store, and Mongoose as its Object Data 
Modeling (ODM) library to interact with MongoDB. 
CoachingUser Model (coachingUser.js)
This model represents users of the coaching platform, which may include students, admins, and 
mentors.
Fields:
• username: Unique and required string to identify the user.
• password: Required string to authenticate the user.
• firstName: Required string for the user's first name.
• lastName: Required string for the user's last name.
• email: Unique and required string for the user's email.
• phoneNumber: Required string for the user's phone number.
• role: Enum that specifies the user's role within the platform, defaults to 'student'.
• opportunities: Array of ObjectIds linking to MentoringOpportunity, specific to students to track 
their interests.
Mentor Model
This model outlines the structure for storing mentor data.
Fields:
• firstName: Required string for the mentor's first name.
• lastName: Required string for the mentor's last name.
• email: Unique and required string for the mentor's email.
• phoneNumber: Required string for the mentor's contact number.
• imageUrl: String for storing the URL of the mentor's image.
• expertise: Enum that includes predefined categories like 'Career_advice', 'Resume_Review', 
'Mock_Interview'.
• bio: Required string for the mentor's biography.
MentoringOpportunity Model
Represents a mentoring opportunity that students can be interested in.
Fields:
• category: Enum for the type of mentoring session, required.
• description: Required string detailing the opportunity.
• mentor: ObjectId linking to a Mentor, required to identify who will conduct the session.
• date: Required date for when the mentoring session is scheduled.
• status: Enum to indicate if the opportunity is 'Open' or 'Closed', with a default of 'Open'.
• timestamps: Automatic fields that store creation and update times.
Authentication Controller Documentation 
The authController.js file contains logic pertaining to user authentication within the Career Coaching 
Platform, including user registration, login, and logout functionalities. 
Sign Up
signup_get
• Purpose: Renders the signup form to the user.
• Route: GET request to /auth/signup.
signup_post
• Purpose: Processes the signup form submission.
• Process:
1. Retrieves user details from the request body.
2. Checks if the username or email already exists in the database.
3. If a user exists, flashes an error message and redirects to the signup page.
4. If no existing user, hashes the password and creates a new user with the role 'student' 
by default.
5. Saves the new user and redirects to the login page with a success message.
Error Handling:
• Catches any errors during the process and redirects to the signup page if an error occurs.
Login
login_get
• Purpose: Renders the login form to the user.
• Route: GET request to /auth/login.
login_post
• Purpose: Processes the login form submission using Passport's local strategy.
• Process:
1. Uses Passport to authenticate the user based on username and password.
2. If authentication fails, flashes an error message and redirects back to the login page.
3. If authentication is successful, it logs the user in and redirects them to a dashboard 
based on their role (admin, student, mentor, etc.).
Error Handling:
• Provides appropriate messages for various failures (incorrect username or password, etc.).
Logout
logout_get
• Purpose: Logs the user out of the application.
• Process:
1. Passport handles the logout process.
2. Upon successful logout, flashes a success message and redirects to the homepage.
Error Handling:
• Catches and handles any errors that may occur during logout.
Passport Configuration
Local Strategy
• Functionality: Defines a Passport Local Strategy for authentication using a username and 
password.
• Process:
1. Looks up the user by username in the database.
2. If the user is not found, returns an error.
3. Compares the hashed passwords.
4. If the passwords match, authentication is successful; otherwise, it fails.
Serialization
• Serializes the user ID to the session to support login sessions.
Deserialization
• Deserializes the user ID from the session to retrieve user details.
Error Logging:
• Console logs for troubleshooting password mismatch, showing the database password and the 
entered password hash.
Notes:
• This file uses bcryptjs for password hashing, which is crucial for security.
• Flash messages provide feedback to the user about the success or failure of their actions.
• Passport's serialization and deserialization are vital for managing user sessions.
• The Passport Local Strategy is configured to authenticate users against the stored credentials in 
the database.
Student Controller Documentation 
The studentController.js file manages various student-related functionalities in a coaching platform. 
Dashboard
• Endpoint: GET /dashboard
• Function: Displays a list of all mentoring opportunities.
• Error Handling: Logs and sends an error response if the rendering fails.
Career Advice
• Endpoint: GET /careerAdvice
• Function: Shows mentoring opportunities specifically categorized under career advice.
• Error Handling: Logs and sends an error response if the rendering fails.
Resume Review
• Endpoint: GET /resumeReview
• Function: Lists opportunities related to resume review services.
• Error Handling: Logs and sends an error response if the rendering fails.
Mock Interview
• Endpoint: GET /mockInterview
• Function: Provides a list of mock interview opportunities.
• Error Handling: Logs and sends an error response if the rendering fails.
Join Opportunity
• Endpoint: POST to /joinOpportunity/:opportunityId
• Function: Allows a student to join an opportunity; avoids adding duplicates.
• Error Handling: Responds with appropriate success or error messages.
Leave Opportunity
• Endpoint: POST to /leaveOpportunity/:opportunityId
• Function: Enables a student to leave an opportunity.
• Error Handling: Responds with appropriate success or error messages.
My Opportunities
• Endpoint: GET /myOpportunities
• Function: Shows a personalized list of opportunities that a student has joined.
• Error Handling: Logs and sends an error response if the rendering fails.
Get Mentors
• Endpoint: GET /mentors
• Function: Displays a list of all mentors available on the platform.
• Error Handling: Logs and sends an error response if the rendering fails.
Admin Controller Documentation 
1. Dashboard Access
• admin_dashboard: Renders the admin dashboard view.
2. Student Management
• list_students: Fetches and displays a list of students.
• get_student: Fetches and displays a single student's details.
• new_student: Renders the form to add a new student.
• create_student: Processes the form submission and adds a new student to the 
database.
• edit_student_get: Renders the form to edit an existing student's details.
• update_student: Processes the form submission and updates a student's details.
• delete_student: Deletes a student from the database.
3. Mentor Management
• list_mentors: Fetches and displays a list of mentors.
• new_mentor: Renders the form to add a new mentor.
• create_mentor: Processes the form submission and adds a new mentor to the database.
• get_mentor: Fetches and displays a single mentor's details.
• edit_mentor_get: Renders the form to edit a mentor's details.
• update_mentor: Processes the form submission and updates a mentor's details.
• delete_mentor: Deletes a mentor from the database.
4. Mentoring Opportunity Management
• display_opportunities: Fetches and displays all mentoring opportunities.
• edit_opportunity: Renders the form to edit an existing mentoring opportunity.
• new_opportunity_get: Renders the form to create a new mentoring opportunity.
• update_opportunity: Processes the form submission and updates the details of a 
mentoring opportunity.
• create_opportunity: Processes the form submission and creates a new mentoring 
opportunity.
The controllers interact with the database through Mongoose models (CoachingUser, Mentor, 
Mentoring Opportunity) and handle error cases by logging to the console and sending appropriate 
responses or flash messages to the user. Password encryption is handled using bcryptjs for creating 
students,
