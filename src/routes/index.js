const express = require("express");
const router = express.Router();

const userRouter = require('../features/user/routes')
const extractionInfoRouter = require('../features/extraction_info/routes')
const ExtractionInfoRepo = require('../features/extraction_info/repository')
const {crawl} = require('../module/crawl')
const Downloader = require('../module/downloader')

const dl = new Downloader()


router.get('/', async (req, res, next)=>{
    const err_msg = req.session.err_msg;
    const userId = req.session.userId || req.user && req.user.id
    delete req.session.userId;
    delete req.session.err_msg;
    let extraction_infos = undefined
    if(req.user)
        try{
            extraction_infos = await ExtractionInfoRepo.getExtractionInfoById(req.user.id)
            console.log(extraction_infos)
        }catch(e){
            console.log(e)
            extraction_infos=[{youtube_url:"서버 내부 에러", extract_time:-1}]
        }
    res.render('index',{
        id: userId,
        err_msg : err_msg,
        extraction_infos :extraction_infos
    })
})

router.use('/user', userRouter)
router.use('/extraction-info', extractionInfoRouter)

router.get('/crawl-test', async (req, res)=>{
    await crawl("https://www.youtube.com/c/Sople")
    res.send({success:true})
})

router.get('/download-audio-test', async (req, res)=>{
    dl.getMP3({videoId:"Pm5HJn9WjwI"}, (err, output)=>{
        if(err)
            res.send({success:false})
        res.send({success:true})
    })
})

module.exports = router