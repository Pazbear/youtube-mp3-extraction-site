const Joi = require('joi');

const constants = require('../constants');

const { YOUTUBE_URL_MIN, YOUTUBE_URL_MAX, EXTRACT_TIME_MIN, EXTRACT_TIME_MAX, VERIFICATION_ERROR } = constants;

const registerSchema = Joi.object().keys({
    youtube_url:Joi.string()
    .min(YOUTUBE_URL_MIN)
    .max(YOUTUBE_URL_MAX),

    extract_time: Joi.number()
    .min(EXTRACT_TIME_MIN)
    .max(EXTRACT_TIME_MAX)
});


async function registerValidate(req, res, next) {
  payloadValidation = await registerSchema.validate(req.body, { abortEarly: false });
  if (payloadValidation.error) {
    req.session.err_msg = VERIFICATION_ERROR;
    return res.redirect('/');
  } else {
    return next();
  }
};

module.exports = {
  registerValidate
}