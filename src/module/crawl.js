const webdriver = require('selenium-webdriver');
const { By } = require('selenium-webdriver')
const chrome = require('selenium-webdriver/chrome')
const path = require('path')
const _ = require('lodash')

const ExtractionInfoRepo = require('../features/extraction_info/repository')
const UserRepo = require('../features/user/repository')

const Downloader = require('./downloader')
const mail = require('./mail')

const dl = new Downloader()

const getVideoList = (driver) => {
    //유튜브 로딩 대기  (3초)
    return new Promise((resolve, reject) => {
        setTimeout(async () => {
            try {
                const videoList = await driver.findElements(By.css('ytd-grid-video-renderer #thumbnail'))
                resolve(await Promise.all(_.map(videoList, (video) => { return video.getAttribute('href') })))
            } catch (error) {
                reject(error)
            }
        }, 3000)
    })
}


//type = 0 : youtube 비디오 리스트 등록(추출 및 보내기 x)
//type = 1 : 새로운 비디오 mp3 추출 및 보내기
const crawl = async ({ id = null, youtube_url, extract_time, extraction_log = null }, UserId, type) => {
    //chromedriver 경로 설정
    const service = new chrome.ServiceBuilder(path.join(__dirname, 'chromedriver.exe')).build();
    chrome.setDefaultService(service);

    //chrome 브라우저 빌드
    const driver = await new webdriver.Builder()
        .setChromeOptions({
            args: ['--disable-infobars',
                '--ignore-ssl-errors=yes',
                '--ignore-certificate-errors',
                '--headless'],
            excludeSwitches: ['enable-logging'],
        })
        .forBrowser('chrome')
        .build();

    await driver.get(youtube_url + '/videos')


    await getVideoList(driver)
        .then(async (list) => {

            if (type == 0) {
                //리스트 => 로그로 변환해 저장
                await ExtractionInfoRepo.registerExtractionInfo(youtube_url, extract_time, UserId, list.join(" &&&& "))
            } else {
                //현재 DB와 비교해서 없는 것들 추출
                console.log("list=")
                console.log(list)
                const last_list = extraction_log.split(" &&&& ")
                const last_new_video_index = _.findIndex(list, (l) => {
                    return l === last_list[0]
                })
                let downloaded_files = []
                let promise_arr = []
                for (let i = 0; i < last_new_video_index; i++) {
                    promise_arr.push(new Promise(async (resolve, reject) => {
                        dl.getMP3({ videoId: list[i].split('?v=')[1] }, (err, out) => {
                            if (err) {
                                console.error(err)
                                reject()
                            }
                            else {
                                downloaded_files.push({
                                    filename: out.videoTitle + ".mp3",
                                    filepath: out.file
                                })
                                console.log(list[i].split('?v=')[1] + "다운로드 완료")
                                resolve()
                            }
                        })
                    }))
                }
                if (promise_arr.length !== 0) {
                    await Promise.all(promise_arr).then(async () => {
                        console.log("promise all")
                        const user = await UserRepo.getUserById(UserId)
                        await mail.sendMP3(user.email, downloaded_files)
                        await ExtractionInfoRepo.updateExtractionInfo(id, list.join(" &&&& "))
                    })
                }
            }
        }).catch(error => {
            console.error(error)
        }).finally(async () => {
            console.log("bye driver")
            await driver.quit();
        })
}

module.exports = {
    crawl
}