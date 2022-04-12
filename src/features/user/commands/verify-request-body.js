const Joi = require('joi');

const constants = require('../constants');

const { PASSWORD_MAX, PASSWORD_MIN, EMAIL_MAX, EMAIL_MIN, VERIFICATION_ERROR } = constants;

const registerSchema = Joi.object().keys({
  email: Joi.string()
  .min(EMAIL_MIN)
  .max(EMAIL_MAX)
  .email({ minDomainSegments: 2 }),

  password: Joi.string()
    .min(PASSWORD_MIN)
    .max(PASSWORD_MAX)
});

const loginSchema = Joi.object().keys({
  email: Joi.string()
  .min(EMAIL_MIN)
  .max(EMAIL_MAX)
  .email({ minDomainSegments: 2 }),

  password: Joi.string()
    .min(PASSWORD_MIN)
    .max(PASSWORD_MAX)
});

async function loginValidate(req, res, next) {
  payloadValidation = await loginSchema.validate(req.body, { abortEarly: false });
  if (payloadValidation.error) {
    req.session.err_msg = VERIFICATION_ERROR;
    req.session.save(()=>{
      return res.redirect('/');
    })
  } else {
    return next();
  }
};

async function registerValidate(req, res, next) {
  payloadValidation = await registerSchema.validate(req.body, { abortEarly: false });
  if (payloadValidation.error) {
    req.session.err_msg = VERIFICATION_ERROR;
    req.session.save(()=>{
      return res.redirect('/');
    })
  } else {
    return next();
  }
};

module.exports = {
  loginValidate,
  registerValidate
}