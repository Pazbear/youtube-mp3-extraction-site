const {wrap} = require('async-middleware')

const express = require("express");
const router = express.Router();

const {registerValidate, loginValidate} = require('./commands/verify-request-body')

const register = require('./commands/register')
const login = require('./commands/login')
const loginHistory = require('./commands/login-history')
const logout = require('./commands/logout')

router.post('/register', wrap(registerValidate), wrap(register))
router.post('/login',wrap(loginValidate), wrap(login), wrap(loginHistory))
router.get('/logout', wrap(logout))

module.exports = router