const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const { getUserForLoginData, getUserById } = require('../features/user/repository');

module.exports = function initAuthMiddleware(app) {
  
  passport.use('local-login',
    new LocalStrategy({
      usernameField:'email',
      passwordField:'password',
      session:false
    },
    async (email, password, done) => {
      const user = await getUserForLoginData(email, password);
      if (!user) {
        return done(null, false);
      }
      return done(null, user);
    })
  );

  passport.serializeUser((user, done) => done(null, user.id));

  passport.deserializeUser(async (id, done) => {
    const user = await getUserById(id);
    if (!user) {
      return done(`Could not deserialize user with id ${id}`);
    }
    return done(null, user);
  });

  app.use(passport.initialize());
  app.use(passport.session());
};
