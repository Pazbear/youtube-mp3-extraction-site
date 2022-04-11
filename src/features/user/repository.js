const bcrypt = require('bcrypt')
const {User, LoginHistory} = require('../../db/models')

async function registerUser({ email, password }) {
  const hashedPass = await bcrypt.hash(password,12);
  const result = await User.create({
    email : email,
    password:hashedPass,
  })
  return {success:true};
}

async function getUserForLoginData(email, password) {
    const user = await User.findOne({
      where:{email:email}
    })
    if (!user) {
      return null;
    }
  
    const isPasswordValid = await bcrypt.compare(password, user.password);
  
    if (!isPasswordValid) {
      return null;
    }
  
    return {
      id: user.id,
      email : user.email
    };
}

async function getUserById(id) {
    const user = await User.findOne({
      attributes:['id', 'email'],
      where : {id : id}
    })
    return user;
}

async function saveLoginHistory(requestIp, id){
    await LoginHistory.create({
      ip : requestIp,
      UserId:id
    })
}

module.exports = {
  registerUser,
  getUserForLoginData,
  getUserById,
  saveLoginHistory
};