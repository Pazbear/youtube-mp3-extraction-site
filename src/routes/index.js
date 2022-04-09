const express = require("express");
const router = express.Router();
const {crawl} = require('../module/crawl')

router.get('/', (req, res, next)=>{
    res.render('index',{
        a:"hello",
        b:"안녕하세요"
    })
})

router.get('/crawl-test', async (req, res)=>{
    await crawl("https://www.youtube.com/c/Sople")
    res.send({success:true})
})

module.exports = router