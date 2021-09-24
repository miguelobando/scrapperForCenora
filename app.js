const puppeteer = require('puppeteer');
const {merger} = require('./utils/filters');
const fs = require('fs');
const {config} = require('./config');

(async () => {
    const browser = await puppeteer.launch({
        headless:false
    });
    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(0)
    process.on('unhandledRejection', (reason, p) => {
        console.error('Unhandled Rejection at: Promise', p, 'reason:', reason);
        browser.close();
      });

      await page.goto(  config.URL,
                    {
                        waitUntil: config.waitUntilOption,
                        timeout: 0                     
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
    fs.writeFile ("./out/output.json", JSON.stringify(a), function(err) {
        if (err) throw err;
        console.log('complete');
        }
    );
    await browser.close()
   
  
})();


