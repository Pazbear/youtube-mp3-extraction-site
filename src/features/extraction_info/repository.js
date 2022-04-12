const { ExtractionInfo } = require('../../db/models')

async function registerExtractionInfo({youtube_url, extract_time}, id){
    await ExtractionInfo.create({
        youtube_url:youtube_url,
        extract_time:extract_time,
        UserId : id
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

module.exports = {
    registerExtractionInfo,
    getExtractionInfoById
}