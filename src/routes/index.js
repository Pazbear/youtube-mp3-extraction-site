const express = require("express");
const router = express.Router();

router.get('/', (req, res, next)=>{
    res.render('index',{
        a:"hello",
        b:"안녕하세요"
    })
})

module.exports = router