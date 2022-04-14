const { ExtractionInfo } = require('../../db/models')

async function registerExtractionInfo(youtube_url, extract_time, id, extraction_log){
    await ExtractionInfo.create({
        youtube_url:youtube_url,
        extract_time:extract_time,
        UserId : id,
        extraction_log : extraction_log
    })
    return {success:true}
}

async function getExtractionInfoById( id ) {
    const result = await ExtractionInfo.findAll({
        where: {
            UserId : id
        },
        raw:true
    })
    return result
}

async function getExtractionInfoByExtractTime(extract_time){
    const result = await ExtractionInfo.findAll({
        where : {
            extract_time : parseInt(extract_time)
        },
        raw:true
    })
    return result
}

module.exports = {
    registerExtractionInfo,
    getExtractionInfoById,
    getExtractionInfoByExtractTime
}