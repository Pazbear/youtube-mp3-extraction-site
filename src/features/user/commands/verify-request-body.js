const Joi = require('joi');

const constants = require('../constants');

const { PASSWORD_MAX, PASSWORD_MIN, EMAIL_MAX, EMAIL_MIN, VERIFICATION_ERROR } = constants;

const schema = Joi.object().keys({
  email: Joi.string()
  .min(EMAIL_MIN)
  .max(EMAIL_MAX)
  .email({ minDomainSegments: 2 }),

  password: Joi.string()
    .min(PASSWORD_MIN)
    .max(PASSWORD_MAX)
});

module.exports = async function validate(req, res, next) {
  payloadValidation = await schema.validate(req.body, { abortEarly: false });
  if (payloadValidation.error) {
    return res.status(400).send({ success: false, message: VERIFICATION_ERROR });
  } else {
    return next();
  }
};
