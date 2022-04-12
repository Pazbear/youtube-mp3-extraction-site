const { saveLoginHistory } = require('../repository');
const requestIp = require('request-ip');

async function LoginHistory(req, res) {
    const { user } = req;
    try{
      await saveLoginHistory(requestIp.getClientIp(req), user.id);
    }catch(error){
        console.log("ip 저장 실패")
        console.log(error);
    }
    req.session.userId = user.id
    req.session.save(()=>{
      return res.redirect('/');
    })
}
  
module.exports = LoginHistory;