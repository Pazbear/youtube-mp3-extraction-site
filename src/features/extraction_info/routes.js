const {wrap} = require('async-middleware')

const express = require("express");
const router = express.Router();

const { registerValidate } = require('./commands/verify-request-body')

const register_extraction_info = require('./commands/register-extraction-info')

router.post('/register',wrap(registerValidate), wrap(register_extraction_info))

module.exports = router