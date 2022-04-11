const axios = require('axios');
const passport = require('passport');

const { USERNAME_PASSWORD_COMBINATION_ERROR, INTERNAL_SERVER_ERROR } = require('../constants');

async function login(req, res, next) {
  return passport.authenticate('local-login', (error, user) => {
    if (error || !user || user.is_admin) {
      req.session.err_msg = USERNAME_PASSWORD_COMBINATION_ERROR;
      return res.redirect('/');
    }

    return req.logIn(user, loginError => {
      if (loginError) {
        req.session.err_msg = INTERNAL_SERVER_ERROR;
        return res.redirect('/');
      }
      return next();
    });
  })(req, res, next);
}

module.exports = login;
