//controllers/authController.js

const bcrypt = require('bcryptjs');
const passport = require('passport');
const CoachingUser = require('../models/coachingUser');



exports.signup_get = (req, res) => {
    res.render('signup');
};


exports.signup_post = async (req, res) => {
    try {
        const { username, password, firstName, lastName, email, phoneNumber } = req.body;
        let user = await CoachingUser.findOne({ $or: [{ username: username }, { email: email }] });

        if (user) {
            req.flash('error', 'Username or Email already exists.');
            return res.redirect('/auth/signup');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        user = new CoachingUser({
            username: username,
            password: hashedPassword,
            firstName: firstName,
            lastName: lastName,
            email: email,
            phoneNumber: phoneNumber,
            role: 'student'
        });

        await user.save();
        req.flash('success', 'You are now registered and can log in.');
        res.redirect('/auth/login');
    } catch (err) {
        console.error(err);
        res.redirect('/auth/signup');
    }
};


exports.login_get = (req, res) => {
    res.render('login');
};


exports.login_post = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            req.flash('error', err.message);
            return next(err);
        }
        if (!user) {
            req.flash('error', info.message);
            return res.redirect('/auth/login');
        }
        req.logIn(user, (err) => {
            if (err) {
                req.flash('error', err.message);
                return next(err);
            }

            req.session.user = user;

            switch (user.role) {
                case 'admin':
                    return res.redirect('/admin/dashboard');
                case 'student':
                    return res.redirect('/student/dashboard');
                case 'mentor':
                    return res.redirect('/mentor/dashboard');
                default:
                    req.flash('error', 'Role not recognized, contact support.');
                    return res.redirect('/auth/login');
            }
        });
    })(req, res, next);
};


exports.logout_get = (req, res) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        // Destroy session on logout
        req.session.destroy(() => {
            req.flash('success', 'You are logged out.');
            res.redirect('/');
        });
    });
};