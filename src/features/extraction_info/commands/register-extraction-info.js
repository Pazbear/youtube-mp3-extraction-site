const registerRepo = require('../repository');
const {crawl} = require('../../../module/crawl')
const { INTERNAL_SERVER_ERROR, FETCH_INFO_ERROR_MESSAGE } = require('../constants')

async function registerExtractionInfo(req, res) {
    let result = undefined
    try{
        const {id} = req.user
        try {
            await crawl(req.body, id, 0);
            return res.redirect('/');
        } catch (error) {
            console.error(error)
            res.session.err_msg = INTERNAL_SERVER_ERROR
            res.session.save(()=>{
                return res.redirect('/')
            })
        }
    }catch(e){
        console.log(e)
        req.session.err_msg = FETCH_INFO_ERROR_MESSAGE
        req.session.save(()=>{
            return res.redirect('/')
        })
    }
}

module.exports = registerExtractionInfo;
