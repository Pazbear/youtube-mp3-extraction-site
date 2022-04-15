const nodemailer = require('nodemailer')
const moment = require('moment')
const {readFileSync, unlinkSync, stat, readdirSync} = require('fs')
const config = require('../config/config.json')

const SMTPConnection = config.mail.config;

module.exports = {
    sendMP3 : (to, files) =>{
        console.log(to+"에게 메일 보냄")
        let attachList = [];
        for(let j=0; j<files.length; j++){
            const file = files[j]
            attachList.push({
                filename : file.filename,
                content : new Buffer(readFileSync(file.filepath), 'base64'),
                contentType : 'audio/mp3'
            })
        }
        try{
            let transporter = nodemailer.createTransport(SMTPConnection);
            transporter.sendMail({
                from:config.mail.from,
                to:to,
                subject:moment().format('YYYY-MM-DD')+ "일자 최신파일",
                html : "<div>.</div>",
                attachments : attachList
            });
        }catch(err){
            console.log(err)
        }
    }
}