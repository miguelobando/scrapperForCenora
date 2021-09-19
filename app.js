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
const {merger} = require('./utils/filters');
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
    let uls = [...document.querySelectorAll('div.activity-result.ship-result ul')];
    uls.forEach(UL => {
        const childrenArray = Array.from(UL.children)
        const record = childrenArray.reduce((accum, currVal) => {
           const [key, value] = currVal.innerText.split(': ');
           return {...accum, [key]: value};
        }, {})    
        records.push(record);
    });
    return records 
})

    let titleList = await page.evaluate(()=>{
        // eslint-disable-next-line no-undef
        let a = Array.from(document.querySelectorAll('h2.ccl-dsk > a')).map(e=> e.innerText.trim());
        return a;
    })
    let a = merger(titleList,infoList);
    fs.writeFile ("input.json", JSON.stringify(a), function(err) {
        if (err) throw err;
        console.log('complete');
        }
    );
    await browser.close()
   
  
})();


