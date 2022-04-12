const schedule = require('node-schedule')
const moment = require('moment')
const rule = '0 0 1 * * *'


module.exports = () => {
    schedule.scheduleJob(rule, ()=>{
        console.log(moment().format("HH"))
    })
}