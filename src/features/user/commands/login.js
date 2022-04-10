const axios = require('axios');
const passport = require('passport');

const { USERNAME_PASSWORD_COMBINATION_ERROR, INTERNAL_SERVER_ERROR } = require('../constants');

async function login(req, res, next) {
  return passport.authenticate('local-login', (error, user) => {
    if (error || !user || user.is_admin) {
      return res.status(401).send({
        success: false,
        message: USERNAME_PASSWORD_COMBINATION_ERROR,
      });
    }

    return req.logIn(user, loginError => {
      if (loginError) {
        return res.status(500).send({
          success: false,
          message: INTERNAL_SERVER_ERROR
        });
      }
      return next();
    });
  })(req, res, next);
}

module.exports = login;
