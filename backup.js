//TODO Pass the 2 functions to modules 
//TODO Dockerize!

// const {puppeteerScraper} = require('./bussinesLogic/puppeteer')

// async function main(){
// const config = {
//     pageUrl: 'https://www.carnival.com/cruise-ships.aspx', 
//     optionWaitUntil: 'networkidle0',
//     evaluationParams: 'div.activity-result.ship-result ul',
//     evaluateId: 'shipInfo'
// }
// let a = await puppeteerScraper(config)
//  console.log(a);
// }

// main();

const puppeteer = require('puppeteer');
// const {merger} = require('./utils/filters');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch();
  
  const page = await browser.newPage();
  await page.goto(  'https://www.carnival.com/cruise-ships.aspx',
                    {
                        waitUntil: 'networkidle0' 
                    }
  );

    let infoList = await page.evaluate(()=>{
    const records = [];
    // eslint-disable-next-line no-undef
    let uls = document.querySelectorAll('div.activity-result.ship-result ul');
    uls.childNodes
    uls.forEach(UL => {
        let record = {}
        UL.forEach((e) => {
            let value = Array.from(e.querySelectorAll('a')).map(e=>e.innerText.trim());
            let key = Array.from(e.querySelectorAll('strong')).map(e=>e.innerText.trim());
            record[key] = value
        })    
        records.push(record);
    });
    return records 
})

   console.log('La lista', infoList);
    // let titleList = await page.evaluate(()=>{
    //     let result = Array.from(document.querySelectorAll('h2.ccl-dsk > a')).map(e=> e.innerText.trim());
    //     return result;
    // })
    // let a = merger(titleList,infoList);
    // fs.writeFile ("output.json", JSON.stringify(a), function(err) {
    //     if (err) throw err;
    //     // console.log('complete');
    //     }
    // );
    await browser.close()
   
  
})();


