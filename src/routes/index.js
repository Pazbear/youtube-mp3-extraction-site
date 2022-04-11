const express = require("express");
const router = express.Router();

const userRouter = require('../features/user/routes')

const {crawl} = require('../module/crawl')

router.get('/', (req, res, next)=>{
    const err_msg = req.session.err_msg;
    console.log(err_msg)
    req.session.valid = null;
    res.render('index',{
        id: req.user && req.user.id,
        err_msg : err_msg,
        extraction_infos :"aaaaaaaaaaaaaaa"
    })
})

router.use('/user', userRouter)

router.get('/crawl-test', async (req, res)=>{
    await crawl("https://www.youtube.com/c/Sople")
    res.send({success:true})
})

module.exports = router