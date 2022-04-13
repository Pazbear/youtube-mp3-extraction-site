const schedule = require('node-schedule')
const moment = require('moment')
const {crawl} = require('./crawl')

const {getExtractionInfoByExtractTime} = require('../features/extraction_info/repository')

const rule = '0 0 */1 * * *'


module.exports = () => {
    schedule.scheduleJob(rule, async ()=>{
        const now_hr = moment().format("HH")
        const extraction_infos = await getExtractionInfoByExtractTime(now_hr)
        console.log(extraction_infos)
        for(let i in extraction_infos){
            console.log(extraction_infos[i])
            await crawl(extraction_infos[i])
        }
    })
}