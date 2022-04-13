const webdriver = require('selenium-webdriver');
const { By } = require('selenium-webdriver')
const chrome = require('selenium-webdriver/chrome')
const path = require('path')
const _ = require('lodash')

const getVideoList = (driver) => {
    //유튜브 로딩 대기  (3초)
    return new Promise((resolve, reject) => {
        setTimeout(async ()=>{
            try{
                const videoList = await driver.findElements(By.css('ytd-grid-video-renderer #thumbnail'))
                resolve(await Promise.all(_.map(videoList, (video)=>{return video.getAttribute('href')})))
            }catch(error){
                reject(error)
            }
        },3000)
    })
}

const crawl = async ({youtube_url, UserId}) => {
    //chromedriver 경로 설정
    const service = new chrome.ServiceBuilder(path.join(__dirname, 'chromedriver.exe')).build();
    chrome.setDefaultService(service);

    //chrome 브라우저 빌드
    const driver = await new webdriver.Builder()
    .forBrowser('chrome')
    .build();

    await driver.get(youtube_url+'/videos')


    await getVideoList(driver)
    .then((list)=> {
        //현재 DB와 비교해서 없는 것들 추출
        
    }).catch(error => {
        console.error(error)
    }).then(async ()=>{
        console.log("bye driver")
        await driver.quit();
        process.exit(0)
    })
}

module.exports = {
    crawl
}