const {wrap} = require('async-middleware')

const express = require("express");
const router = express.Router();

const verifyRequestBody = require('./commands/verify-request-body')

const login = require('./commands/login')
const loginHistory = require('./commands/login-history')

router.post('/login',wrap(verifyRequestBody), wrap(login), wrap(loginHistory))

module.exports = router