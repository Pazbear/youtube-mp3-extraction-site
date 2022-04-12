const registerRepo = require('../repository');

const { SUCCESSFULLY_REGISTERED, INTERNAL_SERVER_ERROR } = require('../constants')

async function getExtractionInfoById(req, res, next) {
  let result = undefined
  try{
    result = await registerRepo.getExtractionInfoById(req.body)
  }catch(error){
    console.error(error)
    result = error
  }
  if (result.success){
    return res.send({success:true, extraction_info : result})
  }else{
    return res.send({success:false, message:INTERNAL_SERVER_ERROR})
  }
}
  
module.exports = getExtractionInfoById;