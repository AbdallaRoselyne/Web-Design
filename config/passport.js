const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const CoachingUser = require('../models/coachingUser'); 

module.exports = function (passport) {
  passport.use(
    new LocalStrategy({ usernameField: 'username' }, (username, password, done) => {

      CoachingUser.findOne({
        username: username
      }).then(user => {
        if (!user) {
          return done(null, false, { message: 'That username is not registered' });
        }
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) throw err;
          if (isMatch) {
            return done(null, user);
          } else {
            return done(null, false, { message: 'Password incorrect' });
          }
        });

      });
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    CoachingUser.findById(id)
      .then(user => {
        done(null, user); 
      })
      .catch(err => {
        done(err, null); 
      });
  });

};
