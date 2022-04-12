const registerRepo = require('../repository');
const { INTERNAL_SERVER_ERROR, FETCH_INFO_ERROR_MESSAGE } = require('../constants')

async function registerExtractionInfo(req, res) {
    let result = undefined
    try{
        const {id} = req.user
        try {
            result = await registerRepo.registerExtractionInfo(req.body, id);
         } catch (error) {
             console.error(error)
             result=error
         }
    }catch(e){
        req.session.err_msg = FETCH_INFO_ERROR_MESSAGE
        req.session.save(()=>{
            return res.redirect('/')
        })
    }
    if (result.success) {
        return res.redirect('/');
    } else {
        res.session.err_msg = INTERNAL_SERVER_ERROR
        res.session.save(()=>{
            return res.redirect('/')
        })
    }
  
}

module.exports = registerExtractionInfo;
