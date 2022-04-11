const registerRepo = require('../repository');
const {EMAIL_ALREADY_EXIST, INTERNAL_SERVER_ERROR, SUCCESSFULLY_REGISTERED} = require('../constants')

async function registerUser(req, res) {
  try {
    result = await registerRepo.registerUser(req.body);
  } catch (error) {
    console.error(error)
    result=error
  }
  if (result.success) {
    return res.send({ success: true, message: SUCCESSFULLY_REGISTERED });
  } else {
    const errName = result.name;
    const databaseError =
      errName === 'SequelizeUniqueConstraintError' ? EMAIL_ALREADY_EXIST : INTERNAL_SERVER_ERROR

    return res.status(500).send({ success: false, message: databaseError });
  }
  
}

module.exports = registerUser;
